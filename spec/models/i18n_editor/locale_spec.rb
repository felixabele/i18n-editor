require 'spec_helper'

module I18nEditor
  describe Locale do

    def load_locale_file locale_code='en'
      I18nEditor::Locale.new( locale_code ) 
    end

    it 'should load a yaml file' do
      yaml_file = load_locale_file
      expect( yaml_file.data ).not_to be_nil
    end

    it "should edit yaml data" do
      yaml_file1 = load_locale_file
      yaml_file1.data['en']['user']['first_name'] = "fii"
      yaml_file1.save

      yaml_file2 = load_locale_file
      expect( yaml_file2.data['en']['user']['first_name'] ).to eq("fii")
    end

    it 'should update a value by key-chain' do
      yaml_file = load_locale_file
      yaml_file.update_value 'en.user.first_name', 'fee'
      expect( yaml_file.data['en']['user']['first_name'] ).to eql("fee")
    end 

    it 'should commit locale file to git' do
      yaml_file = load_locale_file
      yaml_file.commit_to_git!      
    end 

  end
end
