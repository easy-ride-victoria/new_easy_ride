# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  # get 'pages/calendar'
  # get '/calendar', to: "pages#calendar"
  root to: 'pages#index'
  # get '/test', to: "pages#test"
  get '*path', to: 'pages#index', via: :all

  namespace :api do
    namespace :v1 do
      resources :bookings
      resources :rides
    end
  end
  

end
