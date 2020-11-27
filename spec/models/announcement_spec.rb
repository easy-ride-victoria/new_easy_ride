require 'rails_helper'

RSpec.describe Announcement, type: :model do
  it "should fail if start date is later than end date" do
  @announcement = Announcement.new(title: "New announcement", start_date: DateTime.new(2020, 11, 30), end_date: DateTime.new(2020, 11, 29))
    expect {@announcement.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should fail if there is no title" do
  @announcement = Announcement.new(title: nil, start_date: DateTime.new(2020, 11, 30), end_date: DateTime.new(2020, 11, 30))
    expect {@announcement.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should fail if there is no start date" do
  @announcement = Announcement.new(title: "New announcement", start_date: nil, end_date: DateTime.new(2020, 11, 30))
    expect {@announcement.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should fail if there is no end date" do
  @announcement = Announcement.new(title: "New announcement", start_date: DateTime.new(2020, 11, 30), end_date: nil)
    expect {@announcement.save!}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "should save as a new announcement" do
    @announcement = Announcement.create!(title: "New announcement", start_date: DateTime.new(2020, 11, 30), end_date: DateTime.new(2020, 11, 30))
  expect(@announcement.id).to be_present
  end
end
