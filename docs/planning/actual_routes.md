Prefix Verb   URI Pattern                                                                              Controller#Action
pages_calendar GET    /pages/calendar(:format)  pages#calendar
calendar GET    /calendar(.:format)  pages#calendar
root GET  / pages#home
test GET    /test(.:format) pages#test
new_users GET    /users/new(.:format)  users#new
edit_users GET    /users/edit(.:format) users#edit
users   GET    /users(.:format)           users#show
        PATCH  /users(.:format)           users#update
        PUT    /users(.:format)           users#update
      DELETE /users(.:format)           users#destroy
      POST   /users(.:format)           users#create
horses GET /horses(.:format)                                                         horses#index
   horse GET  :format)                                                     horses#show
bookings GET:format)                                                       bookings#index
                                      POST   /bookings(.:format)                                                                      bookings#create
                          new_booking GET    /bookings/new(.:format)                                                                  bookings#new
                         edit_booking GET    /bookings/:id/edit(.:format)                                                             bookings#edit
                              booking GET    /bookings/:id(.:format)                                                                  bookings#show
                                      PATCH  /bookings/:id(.:format)                                                                  bookings#update
                                      PUT    /bookings/:id(.:format)                                                                  bookings#update
                                      DELETE /bookings/:id(.:format)                                                                  bookings#destroy
                                rides GET    /rides(.:format)                                                                         rides#index
                                      POST   /rides(.:format)                                                                         rides#create
                             new_ride GET    /rides/new(.:format)                                                                     rides#new
                            edit_ride GET    /rides/:id/edit(.:format)                                                                rides#edit
                                 ride GET    /rides/:id(.:format)                                                                     rides#show
                                      PATCH  /rides/:id(.:format)                                                                     rides#update
                                      PUT    /rides/:id(.:format)                                                                     rides#update
                                      DELETE /rides/:id(.:format)                                                                     rides#destroy
                         lesson_spots GET    /lesson_spots(.:format)                                                                  lesson_spots#index
                          lesson_spot GET    /lesson_spots/:id(.:format)                                                              lesson_spots#show