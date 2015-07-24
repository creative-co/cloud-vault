class Summary < Struct.new(:project_id, :title, :updated_at, :team_size)
  def initialize(project)
    super(project.id, project.title, project.updated_at, rand(10)) # TODO: remove rand
  end

  def self.all_for_user(user)
    user_versions = ProjectVersion.joins(:passphrases).
        where('passphrases.user_id = ?', user.id).
        where('project_versions.project_id = projects.id')

    Project.
        where(user_versions.exists).
        map(&method(:new)) # TODO: ACL
  end

  alias :read_attribute_for_serialization :send
end