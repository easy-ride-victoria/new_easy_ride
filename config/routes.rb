# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  get 'pages/calendar'
  get '/calendar', to: "pages#calendar"
  root to: 'pages#home'
  get '/test', to: "pages#test"
  
  resource :users
  resources :horses, only: [:index, :show]
  resources :bookings
  resources :rides
  resources :lesson_spots, only: [:index, :show]

end
