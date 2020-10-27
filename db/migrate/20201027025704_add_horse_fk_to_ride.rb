class AddHorseFkToRide < ActiveRecord::Migration[6.0]
  def change
    remove_column :rides, :horse
    add_column :rides, :horse_id, :integer
    add_foreign_key :rides, :horses
  end
end