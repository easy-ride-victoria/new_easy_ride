class UserSerializer
  include JSONAPI::Serializer
  attributes :first_name, :last_name, :hcbc_number, :hcbc_number_valid_until, :is_admin, :active, :email
  has_many :rides
end
