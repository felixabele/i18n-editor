class I18nEditor::Configuration

  attr_accessor :authentication_user, :authentication_password

  def initialize
    @authentication_user = nil
    @authentication_password = nil
  end
end