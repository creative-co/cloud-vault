# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150426200233) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "passphrases", force: :cascade do |t|
    t.text     "phrase",             null: false
    t.integer  "user_id",            null: false
    t.integer  "project_version_id", null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "passphrases", ["user_id", "project_version_id"], name: "index_passphrases_on_user_id_and_project_version_id", using: :btree

  create_table "project_versions", force: :cascade do |t|
    t.integer  "project_id",        null: false
    t.integer  "version_number",    null: false
    t.integer  "author_id",         null: false
    t.text     "encrypted_content", null: false
    t.text     "team",              null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "project_versions", ["project_id", "version_number"], name: "index_project_versions_on_project_id_and_version_number", using: :btree

  create_table "projects", force: :cascade do |t|
    t.integer  "version_number"
    t.string   "title",          null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "public_key_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

end
