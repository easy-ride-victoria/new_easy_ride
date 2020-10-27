class CreateHorses < ActiveRecord::Migration[6.0]
  def change
    create_table :horses do |t|
      t.string :name
      t.string :breed
      t.date :date_of_birth
      t.text :profile_picture
      t.boolean :active, null: false, default: true

      t.timestamps
    end
  end
end
