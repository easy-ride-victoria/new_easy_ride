class Ride < ApplicationRecord
  belongs_to :booking
  belongs_to :horse
  belongs_to :user

  # validate :horse_is_available?

  # def horse_is_available?
  #   if horse.has_ride_on_day?(booking.start_time.to_date)
  #     self.errors.add :horse, 'has already been booked for this day'
  #   end
  # end
end
