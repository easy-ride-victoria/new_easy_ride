class HorseSerializer
  include JSONAPI::Serializer
  attributes :name, :breed, :date_of_birth, :profile_picture, :active
end
