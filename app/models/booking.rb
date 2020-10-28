class Booking < ApplicationRecord
  has_many :rides

  # validate needs to run a function in order to validate
  validate :valid_dates
  # validates is checking for specific fields
  validates :event_type, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true

  def valid_dates
    if !start_time.nil? && !end_time.nil? && start_time >= end_time
      self.errors.add :start_time, 'has to be before End time'
    end
  end

  # before_create :timefy
  # def timefy
  #   self.start_time = Time.parse(start_time)
  # end

end
