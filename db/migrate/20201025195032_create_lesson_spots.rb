class CreateLessonSpots < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_spots do |t|
      t.string :lesson_payment_id
      t.string :payment_type
      t.float :price_CAD
      t.datetime :cancellation_requested_at

      t.timestamps
    end
  end
end
