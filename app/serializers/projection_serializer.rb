class ProjectionSerializer < ActiveModel::Serializer
  attributes :project_id, :title, :version_number, :content, :team, :passphrase
end
