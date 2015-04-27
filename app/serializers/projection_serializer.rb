class ProjectionSerializer < ActiveModel::Serializer
  attributes :project_id, :title, :encrypted_content, :team, :passphrase
end
