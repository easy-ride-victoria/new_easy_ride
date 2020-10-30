require 'rails_helper'

RSpec.describe Horse, type: :model do
  describe ".has_ride_on_day?" do
    before do 
      @user = User.create!(first_name: "first", last_name: "last", email: "EMAIL@email.com")
      @horse = Horse.create!(name: "horse", breed: "horsey", date_of_birth: Date.new(2003, 1, 1))
      @booking = Booking.create!(event_type: "other", start_time: DateTime.new(2020, 10, 27, 10), end_time: DateTime.new(2020, 10, 27, 11))
      @ride = Ride.create!(location: "outdoors", booking: @booking, user: @user, horse: @horse)
    end

    # it "should return true if the horse has a ride scheduled for day" do
    #   expect(@horse.has_ride_on_day? Date.new(2020, 10, 27)).to equal(true)
    # end

    # it "should return false if the horse doesn't have a ride scheduled for day" do
    #   expect(@horse.has_ride_on_day? Date.new(2020, 10, 28)).to equal(false)
    # end
    
  end
end
