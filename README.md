# README
# EasyRide

A scheduling app for riders to book riding times and lesson spots, report on progress made and follow through on payment and invoicing. Made with a specific client in mind.

## User Stories / requirements
- As a member of the public, I am welcomed on a page with a redirection to the main VTRA website.

- As a member of the Exercise Rider team:
  - I can log-in
  - I can see a calendar which displays current and upcoming un-availability of the indoor arena to plan my ride.
  - I can book my own ride on my usual horse for a specific day and time. I can cancel that ride.
  - I can get some weather forecast in the app to know if riding outside is an option if the indoor arena is booked.
  - I can file my rider progress report after i finished my ride.
  - I can book my next lesson spot, and pay for it.
  - I can message other members in real time (to arrange a team ride)
  - if I want to cancel my lesson, I send a notification to the admin who will process the cancellation.

- As an admin:
  - I can log-in into the admin side of the app
  - I can add, edit and destroy arena bookings as needed
  - I can add, edit, destroy lessons and open them up to reservation for the riders.
  - Obtain rider reports after their ride. 
  - I can message all members in real time.
  - I can process riders requests, including cancellations.

# Routes summary

- Home page: '/'
    - welcome
    - login 
    - vtra.ca re-direct

- Members app page: '/members'(react)
    - calendar
    - book riding spot/lesson
    - chat area
    - report

- Members profile page: '/members/:id'(react)
    - edit hcbc status
    - edit login credentials
    - edit firt name/last name
    - edit horse
    - invoices

- Admin page: '/admin' (React)
    - calendar with edit, add, and delete functionality
    - create new lesson form
    - create new report form
    - forward sign-up page

- Sign-up: '/admin/signup'
    - sign up form

- 
