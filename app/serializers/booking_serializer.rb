class BookingSerializer
  include JSONAPI::Serializer

  attributes :event_type, :start_time, :end_time, :rides, :lesson_price_cad, :lesson_total_spots
  has_many :rides

end
