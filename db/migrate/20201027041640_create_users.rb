class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :password_digest
      t.string :hcbc_number
      t.date :hcbc_number_valid_until
      t.boolean :is_admin, null: false, default: false
      t.boolean :active, null: false, default: true

      t.timestamps
    end
  end
end
