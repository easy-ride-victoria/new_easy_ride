# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

bookings = Booking.create ([
  {
    event_type: "lesson",
    start_time: DateTime.strptime("11/05/2020 10:10", "%m/%d/%Y %H:%M"),
    end_time: DateTime.strptime("11/05/2020 11:10", "%m/%d/%Y %H:%M")
  },
  {
    event_type: "ride",
    start_time: DateTime.strptime("11/06/2020 15:15", "%m/%d/%Y %H:%M"),
    end_time: DateTime.strptime("11/06/2020 16:15", "%m/%d/%Y %H:%M")
  },
  {
    event_type: "other",
    start_time: DateTime.strptime("11/07/2020 15:30", "%m/%d/%Y %H:%M"),
    end_time: DateTime.strptime("11/07/2020 17:30", "%m/%d/%Y %H:%M")
  }
])

rides = Ride.create ([
  {
    user: "Audrey",
    horse: "Cisco",
    location: "indoor",
    booking: bookings.first
  },
  {
    user: "Iyris",
    horse: "Danny",
    location: "indoor",
    booking: bookings.first
  },
  {
    user: "Nicole",
    horse: "Triggeer",
    location: "indoor",
    booking: bookings.last
  }
])
