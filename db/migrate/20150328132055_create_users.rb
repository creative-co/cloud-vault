class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :public_key_id, null: false, unique: true
      t.timestamps null: false
    end
  end
end
