class ReportSerializer
  include JSONAPI::Serializer
  attributes :user, :horse, :activity_date, :answer1, :answer2, :answer3, :answer4
end
