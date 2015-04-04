class Project < ActiveRecord::Base
  has_many :project_versions

  def current_version
    project_versions.where(version_number: version_number).first
  end
end
