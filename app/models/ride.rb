class Ride < ApplicationRecord
  has_many :horses
  has_many :users
  has_many :bookings
  
end
