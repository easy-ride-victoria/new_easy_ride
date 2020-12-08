class Announcement < ApplicationRecord

  validate :valid_dates
  validates :title, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

  def valid_dates
    if !start_date.nil? && !end_date.nil? && start_date > end_date
      puts "invalid date"
      errors.add :start_date, 'has to be before end date'
    end
  end
  
end
