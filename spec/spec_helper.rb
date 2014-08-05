ENV['RAILS_ENV'] ||= 'test'

require File.expand_path("../dummy/config/environment.rb",  __FILE__)
require 'rspec/rails'
require 'rspec/autorun'

#Rails.backtrace_cleaner.remove_silencers!

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }


def write_sample_locale
  sample = {
    'en' => {
      'user' => { 
        'first_name' => 'Foo',
        'last_name' => 'Bar'
      }
    }
  }
  File.open(File.dirname(__FILE__) + '/dummy/config/locales/en.yml','w') do |f| 
    f.write sample.to_yaml
  end
end


RSpec.configure do |config|
  config.mock_with :rspec
  config.use_transactional_fixtures = true
  config.infer_base_class_for_anonymous_controllers = false
  config.color_enabled = true
  config.tty = true
  config.formatter = :documentation  
  config.order = "random"  

  # set sample yaml file
  config.before(:each) do
    write_sample_locale
  end

  config.after(:each) do
    #File.delete(File.dirname(__FILE__) + '/dummy/config/locales/en.yml')
    write_sample_locale
  end  
end