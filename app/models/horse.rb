class Horse < ApplicationRecord
  has_many :rides
  has_many :bookings, through: :rides

  # def has_ride_on_day?(day)
  #   bookings.where("start_time::date = ?", day).length > 0
  # end

end
