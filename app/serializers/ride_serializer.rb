class RideSerializer
  include JSONAPI::Serializer
  attributes :user, :horse, :location, :booking_id

end
