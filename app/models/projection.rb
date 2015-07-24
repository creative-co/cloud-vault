# Represents a Project on UI side
# Attributes
# * title
# * version_number
# * content: passwords etc, encrypted with a symmetric key
# * team: PGP-signed newline-separated array of team members
# * passphrase: encrypted passphrase for the current user
class Projection
  include ActiveModel
  extend ActiveModel::Naming

  delegate :title, :version_number, to: :@project
  delegate :encrypted_content, :team, to: :@version

  def initialize(project_id, user)
    @project = Project.find(project_id)
    @version = @project.current_version
    @passphrase = @version.passphrases.where(user_id: user.id).first
  end

  def passphrase
    @passphrase.phrase
  end

  def project_id
    @project.id
  end

  def to_model
    self
  end

  def persisted?
    @project.persisted?
  end

  alias :read_attribute_for_serialization :send # to play with ActiveModelSerializers

  class << self
    def create!(attributes, author)
      raise ArbumentError, 'Blank passphrases provided' if attributes[:passphrases].blank?

      project = Project.create(title: attributes.fetch(:title), version_number: 1)
      project_version = project.project_versions.create!(
          author: author,
          encrypted_content: attributes.fetch(:encrypted_content), # <-- the secret information is here
          team: attributes.fetch(:signed_team)
      )
      attributes.fetch(:passphrases).each do |kb_login, passphrase|
        user = User.first_or_create!(kb_login: kb_login)
        project_version.passphrases.create!(user: user, phrase: passphrase)
      end

      Projection.new(project.id, author)
    end

    # private
    # def self.decode_team(signed_team, author)
    #   author_public_key = PublicKeysCache.fetch(author.kb_login)
    #   decoded = PgpEngine.decrypt_team(signed_team, author_public_key)
    #   decoded.each_line.to_a.map(&:chomp)
    # end
  end
end


# To create projection, I should:
# create a new named project
# create users unless they exist
# find author user
# create project_version
# create passphrase for each of the users