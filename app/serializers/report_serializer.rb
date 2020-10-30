class ReportSerializer
  include JSONAPI::Serializer
  attributes :user, :horse, :q1, :q2, :q3, :q4, :q5, :a1, :a2, :a3, :a4, :a5
end
