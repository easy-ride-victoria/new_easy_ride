class ForeignKeysBookingsReally < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :rides, :users
    add_foreign_key :rides, :horses
    add_foreign_key :rides, :bookings
  end
end
