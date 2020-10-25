class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :hcbc_number
      t.date :hcbc_number_valid_until
      t.boolean :is_admin
      t.boolean :active

      t.timestamps
    end
  end
end
