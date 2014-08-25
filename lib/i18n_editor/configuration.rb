class I18nEditor::Configuration

  attr_accessor :authentication_user, :authentication_password, :git_repository

  def initialize
    @authentication_user = nil
    @authentication_password = nil
    @git_repository = nil
  end
end