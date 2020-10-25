Rails.application.routes.draw do
  get '/calendar', to: "pages#calendar"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  root to: 'pages#home'
  get '/test', to: "pages#test"
end
