class CreateHorses < ActiveRecord::Migration[6.0]
  def change
    create_table :horses do |t|
      t.string :name
      t.string :breed
      t.date :date_of_birth
      t.string :profile_picture
      t.boolean :active

      t.timestamps
    end
  end
end
