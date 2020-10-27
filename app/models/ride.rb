class Ride < ApplicationRecord
  belongs_to :booking
  belongs_to :horse
end
