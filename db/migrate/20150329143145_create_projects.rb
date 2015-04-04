class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :version_number
      t.string :title, null: false

      t.timestamps null: false
    end
  end
end
