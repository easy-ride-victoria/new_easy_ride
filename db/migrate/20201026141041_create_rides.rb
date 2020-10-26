class CreateRides < ActiveRecord::Migration[6.0]
  def change
    create_table :rides do |t|
      t.string :user
      t.string :horse
      t.string :location
      t.belongs_to :booking, null: false, foreign_key: true

      t.timestamps
    end
  end
end
