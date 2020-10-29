class UserSerializer
  include JSONAPI::Serializer
  attributes :first_name, :last_name, :hcbc_number, :hcbc_active, :is_admin, :active, :email
  has_many :rides
end
