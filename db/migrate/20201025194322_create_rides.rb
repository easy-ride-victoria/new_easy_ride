class CreateRides < ActiveRecord::Migration[6.0]
  def change
    create_table :rides do |t|
      t.string :ride_location

      t.timestamps
    end
  end
end
