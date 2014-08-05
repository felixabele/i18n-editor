module I18nEditor
  class Locale
    attr_accessor :data, :file_path, :code, :errors

    def initialize( code )
      @code = code
      @file_path = "#{Rails.root}/config/locales/#{code}.yml"
      @data = YAML.load_file(@file_path)
    end

    def raw_data
      File.read( @file_path )
    end

    def update_value key_chain, value
      array_chain = key_chain.split('.').map{|a| "['#{a}']"}.join()
      eval "@data#{array_chain} = '#{value}'"
      save
    end

    def save
      begin
        File.open(@file_path,'w') do |f| 
          f.write @data.to_yaml
        end
        I18n.backend.reload!
        commit_to_git!
        return true
      rescue Exception => e
        @errors = e
        return false
      end
    end

    def push_to_git
      msg = "I18nEditor locale copy update of #{@code}"
      system("git add #{@file_path}") && system("git commit -m '#{msg}'") && system("git push")
    end

    def self.all
      locales = []
      Dir.foreach("#{Rails.root}/config/locales/") do |item|
        next if item == '.' or item == '..'
        locale_code = item.gsub('.yml', '')
        locales << locale_code
        #locales << Locale.new( locale_code )
      end
      locales
    end
  end
end
