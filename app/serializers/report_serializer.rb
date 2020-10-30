class ReportSerializer
  include JSONAPI::Serializer
  attributes :user, :horse, :activity:date, :answer1, :answer2, :answer3, :answer4
end
