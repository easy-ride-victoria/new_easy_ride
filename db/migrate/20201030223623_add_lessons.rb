class AddLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :rides, :lesson_payment_id, :string
    add_column :rides, :lesson_payment_type, :string
    add_column :rides, :cancellation_requested_at, :datetime

    add_column :bookings, :lesson_price_cad, :decimal
    add_column :bookings, :lesson_total_spots, :integer
  end
end
