$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "i18n_editor/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "i18n_editor"
  s.version     = I18nEditor::VERSION
  s.authors     = ["Felix Abele"]
  s.email       = ["felix.abele@gmail.com"]
  s.homepage    = "felix-abele.de"
  s.summary     = "Editor for editing and managing i18n-locals."
  s.description = "edit and Manage i18n-locals in production mode."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 3.2.18"
  s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
  s.add_development_dependency 'rspec-rails'
  s.test_files = Dir["spec/**/*"]
end
