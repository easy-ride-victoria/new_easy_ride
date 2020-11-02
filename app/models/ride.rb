class Ride < ApplicationRecord
  belongs_to :booking
  belongs_to :horse
  belongs_to :user

  validate :horse_is_available?

  def horse_is_available?
    # bookings_by_day = horse.bookings_by_day(booking.start_time.to_date)
    rides_by_day = horse.rides_by_day(booking.start_time.to_date)
    return if rides_by_day.empty? || rides_by_day.first.id == id

    errors.add :horse, 'has already been booked for this day'
  end
end
