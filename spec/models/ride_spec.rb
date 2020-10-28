require 'rails_helper'

RSpec.describe Ride, type: :model do
  before do
    @user = User.create!(first_name: "first", last_name: "last", email: "EMAIL@email.com")
    @horse = Horse.create!(name: "horse", breed: "horsey", date_of_birth: Date.new(2003, 1, 1))
    @booking = Booking.create!(event_type: "other", start_time: DateTime.new(2020, 10, 27, 10), end_time: DateTime.new(2020, 10, 27, 11))
  end

  it "should save a valid ride" do
    @ride = Ride.create!(location: "outdoors", booking: @booking, user: @user, horse: @horse)
    expect(@ride.id).to be_present
  end

  it "should fail if horse is already scheduled for a ride on the same day" do
    Ride.create!(location: "outdoors", booking: @booking, user: @user, horse: @horse)
    @booking = Booking.create!(event_type: "other", start_time: DateTime.new(2020, 10, 27, 11), end_time: DateTime.new(2020, 10, 27, 12))
    @ride = Ride.new(location: "outdoors", booking: @booking, user: @user, horse: @horse)
    expect{@ride.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end

end
