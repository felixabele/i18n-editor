require "i18n_editor/engine"
require 'i18n_editor/configuration'

module I18nEditor
  # @return [Configuration] The configuration singleton.
  def self.configuration
    @configuration ||= I18nEditor::Configuration.new
  end

  def self.configuration=(configuration)
    @configuration = configuration
  end
end
