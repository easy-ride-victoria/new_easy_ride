class ChangeDataType < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :hcbc_number_valid_until, :date
    add_column :users, :hcbc_active, :boolean
  end
end
