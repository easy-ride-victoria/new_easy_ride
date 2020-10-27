class Ride < ApplicationRecord
  belongs_to :booking
  belongs_to :horse
  belongs_to :user
end
