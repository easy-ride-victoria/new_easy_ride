class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.string :event_type
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
