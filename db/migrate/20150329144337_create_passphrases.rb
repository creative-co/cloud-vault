class CreatePassphrases < ActiveRecord::Migration
  def change
    create_table :passphrases do |t|
      t.text :phrase, null: false
      t.integer :user_id, null: false
      t.integer :project_version_id, null: false

      t.timestamps null: false
    end

    add_index :passphrases, [:user_id, :project_version_id]
  end
end
