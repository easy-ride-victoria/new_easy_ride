class Booking < ApplicationRecord
  has_many :rides

  # before_create :timefy
  # def timefy
  #   self.start_time = Time.parse(start_time)
  # end

end
