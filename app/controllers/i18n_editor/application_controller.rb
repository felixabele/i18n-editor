module I18nEditor
  class ApplicationController < ActionController::Base

    before_filter :authenticate_user

    # --- Force HTTP-Authentication on Staging
    def authenticate_user
      if I18nEditor.configuration.authentication_user.present? and I18nEditor.configuration.authentication_password.present?
        authenticate_or_request_with_http_basic do |username, password|
          username == I18nEditor.configuration.authentication_user && password == I18nEditor.configuration.authentication_password
        end
      end
    end

  end
end
