class Booking < ApplicationRecord
  belongs_to :rides
  has_many :lesson_spots
end
