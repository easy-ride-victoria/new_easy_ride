class BookingSerializer
  include JSONAPI::Serializer
  
  attributes :event_type, :start_time, :end_time
  has_many :rides

  
end
