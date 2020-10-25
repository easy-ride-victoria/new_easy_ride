class ForeignKeysBookings < ActiveRecord::Migration[6.0]
  def change
    add_column :rides, :horse_id, :int
    add_column :rides, :user_id, :int
    add_column :rides, :booking_id, :int
  end
end
