# call me with: rspec spec/controllers/i18n_editor/locales_controller_spec.rb

require 'spec_helper'

module I18nEditor
  describe LocalesController do

    describe "GET #index" do
      it "lists all available locale files" do
        get :index, use_route: :i18n_editor
        puts response.body
        expect(response).to be_success
        expect(response.status).to eq(200)
      end  
    end
    
    describe "GET #show" do
      it "responds successfully with an HTTP 200 status code" do
        get :show, locale: 'en', use_route: :i18n_editor
        expect(response).to be_success
        expect(response.status).to eq(200)
      end  
    end

    describe "PUT #update" do
      it "should update locale key" do
        put :update, locale: 'en', key_chain: 'en.user.first_name', value: 'john', use_route: :i18n_editor
        expect(response).to be_success
        expect( JSON.parse(response.body)['success'] ).to be_true
      end  
    end

  end
end
