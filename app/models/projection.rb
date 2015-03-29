# Represents a Project on UI side
# Attributes
# * title
# * version
# * content: passwords etc, encrypted with a symmetric key
# * team: PGP-signed JSON array, e.g. [{kb_login: 'vovayartsev', public_key_id: 'ABCDEFGH'}])
# * passphrase: encrypted passphrase for the current user
class Projection
  def initialize(project_id, user)
  end

  alias :read_attribute_for_serialization :send
end