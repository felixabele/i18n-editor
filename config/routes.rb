I18nEditor::Engine.routes.draw do
  put "locales/push_to_git", to: "locales#push_to_git", as: 'push_to_git_locale'
  resources :locales, :constraints => { :id => /.*/ }
  root to: "editor#index"
end
