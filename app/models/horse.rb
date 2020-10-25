class Horse < ApplicationRecord
  validates :name, presence: true

  belongs_to :rides
end
