class AddDefaultHorseActive < ActiveRecord::Migration[6.0]
  def change
    change_column :horses, :active, :boolean, :default => true
  end
end
