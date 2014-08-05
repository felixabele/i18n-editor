require_dependency "i18n_editor/application_controller"

module I18nEditor
  class LocalesController < ApplicationController

    before_filter :load_locale, only: [:update, :show, :push_to_git]

    def index
      render json: Locale.all.to_json
    end

    def show
      render json: @locale.data
    end 

    def update
      @locale.update_value( params[:key_chain], params[:value] )
      render json: {success: @locale.save, errors: @locale.errors}
    end

    def push_to_git
      render json: {success: @locale.push_to_git}
    end    

    private 

    def load_locale
      @locale = Locale.new( params[:locale] || params[:id] ) 
    end
  end
end
