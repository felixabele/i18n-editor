require_dependency "i18n_editor/application_controller"

module I18nEditor
  class EditorController < ApplicationController

    def index
      @available_locales = Locale.all      
      @locale = Locale.new( params[:locale] || @available_locales.first ) 
    end
  end
end
