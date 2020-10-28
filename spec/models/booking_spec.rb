require 'rails_helper'

RSpec.describe Booking, type: :model do
  it "should have an end time after the start time" do
    @booking = Booking.new(event_type: "other", start_time: DateTime.new(2020, 10, 27, 10), end_time: DateTime.new(2020, 10, 27, 9))
    expect {@booking.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should save a valid booking" do
    @booking = Booking.create!(event_type: "other", start_time: DateTime.new(2020, 10, 27, 10), end_time: DateTime.new(2020, 10, 27, 11))
    expect(@booking.id).to be_present
  end
  it "should fail if no event type is listed" do
    @booking = Booking.new(event_type: nil, start_time: DateTime.new(2020, 10, 27, 10), end_time: DateTime.new(2020, 10, 27, 11))
    expect{@booking.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should fail if no start time is listed" do
    @booking = Booking.new(event_type: "other", start_time: nil, end_time: DateTime.new(2020, 10, 27, 11))
    expect{@booking.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should fail if no end time is listed" do
    @booking = Booking.new(event_type: "other", start_time: DateTime.new(2020, 10, 27, 10), end_time: nil)
    expect{@booking.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
end
