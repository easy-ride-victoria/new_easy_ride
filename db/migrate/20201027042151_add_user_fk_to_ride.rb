class AddUserFkToRide < ActiveRecord::Migration[6.0]
  def change
    remove_column :rides, :user
    add_column :rides, :user_id, :integer
    add_foreign_key :rides, :users
  end
end
