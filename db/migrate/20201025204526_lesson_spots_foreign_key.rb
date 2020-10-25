class LessonSpotsForeignKey < ActiveRecord::Migration[6.0]
  def change
    add_column :lesson_spots, :booking_id, :int

    add_foreign_key :lesson_spots, :bookings
  end
end
