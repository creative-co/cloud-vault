# Represents a Project on UI side
# Attributes
# * title
# * version_number
# * content: passwords etc, encrypted with a symmetric key
# * team: PGP-signed JSON array, e.g. [{kb_login: 'vovayartsev', public_key_id: 'ABCDEFGH'}])
# * passphrase: encrypted passphrase for the current user
class Projection
  delegate :title, :version_number, to: :@project
  delegate :content, :team, to: :@version

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

  alias :read_attribute_for_serialization :send
end