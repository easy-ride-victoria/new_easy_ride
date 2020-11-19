class AnnouncementSerializer
  include JSONAPI::Serializer
  attributes :title, :start_date, :end_date
end
