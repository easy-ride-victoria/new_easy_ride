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

ActiveRecord::Schema.define(version: 2020_12_02_173901) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "announcements", force: :cascade do |t|
    t.string "title"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bookings", force: :cascade do |t|
    t.string "event_type"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "lesson_price_cad"
    t.integer "lesson_total_spots"
  end

  create_table "horses", force: :cascade do |t|
    t.string "name"
    t.string "breed"
    t.date "date_of_birth"
    t.text "profile_picture"
    t.boolean "active", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "reports", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "horse_id", null: false
    t.string "activity_date"
    t.boolean "answer1"
    t.string "answer2"
    t.string "answer3"
    t.text "answer4"
    t.index ["horse_id"], name: "index_reports_on_horse_id"
    t.index ["user_id"], name: "index_reports_on_user_id"
  end

  create_table "rides", force: :cascade do |t|
    t.string "location"
    t.bigint "booking_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "horse_id"
    t.integer "user_id"
    t.string "lesson_payment_id"
    t.string "lesson_payment_type"
    t.datetime "cancellation_requested_at"
    t.index ["booking_id"], name: "index_rides_on_booking_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "hcbc_number"
    t.boolean "is_admin", default: false, null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "hcbc_active"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "reports", "horses"
  add_foreign_key "reports", "users"
  add_foreign_key "rides", "bookings"
  add_foreign_key "rides", "horses"
  add_foreign_key "rides", "users"
end
