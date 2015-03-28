class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :kb_login

      t.timestamps null: false
    end
  end
end
