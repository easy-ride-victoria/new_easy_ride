# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_25_204526) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.string "event_type"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "horses", force: :cascade do |t|
    t.string "name"
    t.string "breed"
    t.date "date_of_birth"
    t.string "profile_picture"
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "lesson_spots", force: :cascade do |t|
    t.string "lesson_payment_id"
    t.string "payment_type"
    t.float "price_CAD"
    t.datetime "cancellation_requested_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "booking_id"
  end

  create_table "rides", force: :cascade do |t|
    t.string "ride_location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "horse_id"
    t.integer "user_id"
    t.integer "booking_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "hcbc_number"
    t.date "hcbc_number_valid_until"
    t.boolean "is_admin", default: false
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "lesson_spots", "bookings"
  add_foreign_key "rides", "bookings"
  add_foreign_key "rides", "horses"
  add_foreign_key "rides", "users"
end
