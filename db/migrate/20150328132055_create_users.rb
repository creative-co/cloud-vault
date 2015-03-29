class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :public_key_id
      t.timestamps null: false
    end
    add_index :users, [:public_key_id], unique: true
  end
end
