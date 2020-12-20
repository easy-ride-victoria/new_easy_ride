# frozen_string_literal: true

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # get 'pages/calendar'
  # get '/calendar', to: "pages#calendar"
  root to: 'pages#app'
  # get '/test', to: "pages#test"

  get '/sign_in', to: 'pages#sign_in'

  namespace :api do
    namespace :v1 do
      resources :bookings
      resources :rides
      resources :users
      resources :horses
      resources :reports
      resources :announcements
      post '/payments', to: 'payments#create'
      get '/current_user', to: 'current_user#index'
    end
  end
  # get path needs to be below the api to only render the index page
  # when the route is not part of the api
  get '*path', to: 'pages#app', via: :all

end
