class Ride < ApplicationRecord
  belongs_to :booking
  belongs_to :horse
  belongs_to :user

  validate :horse_is_available?

  def horse_is_available?
    bookings_by_day = horse.bookings_by_day(booking.start_time.to_date)
    if !bookings_by_day.empty? && (bookings_by_day.first.id != booking.id || booking.event_type == 'lesson')
      self.errors.add :horse, 'has already been booked for this day'
    end
  end
end
