class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.references :user, null: false, foreign_key: true
      t.references :horse, null: false, foreign_key: true
      t.string :activity_date
      t.boolean :answer1
      t.string :answer2
      t.string :answer3
      t.text :answer4
      t.text :answer5
    end
  end
end
