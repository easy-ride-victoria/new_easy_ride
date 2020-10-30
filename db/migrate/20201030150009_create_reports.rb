class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.references :user, null: false, foreign_key: true
      t.references :horse, null: false, foreign_key: true
      t.string :q1
      t.string :q2
      t.string :q3
      t.string :q4
      t.string :q5
      t.string :a1
      t.string :a2
      t.string :a3
      t.string :a4
      t.text :a5

      t.timestamps
    end
  end
end
