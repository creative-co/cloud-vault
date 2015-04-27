class RenameVersionContent < ActiveRecord::Migration
  def change
    rename_column :project_versions, :content, :encrypted_content
  end
end
