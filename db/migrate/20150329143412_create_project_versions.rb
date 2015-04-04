class CreateProjectVersions < ActiveRecord::Migration
  def change
    create_table :project_versions do |t|
      t.integer :project_id, null: false
      t.integer :version_number, null: false
      t.integer :author_id, null: false
      t.text :content, null: false
      t.text :team, null: false

      t.timestamps null: false
    end

    add_index :project_versions, [:project_id, :version_number]
  end
end
