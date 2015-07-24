class RequestSignature
  attr_reader :kb_login, :timestamp, :csrf_token

  # caught in controller to prevent bad requests
  Invalid = Class.new(StandardError)

  def initialize(base64_signature, kb_login)
    raise Invalid, 'Bad characters in kb_login' unless kb_login =~ /^[\d\w_-]+$/
    @kb_login = kb_login
    @signature = Base64.decode64(base64_signature)
  end

  def validate!
    sig = PgpEngine.verify(@signature, public_key)
    raise Invalid unless sig.valid?
    @timestamp = sig.timestamp
    @csrf_token = sig.content.strip
  end

  def public_key
    # this will fetch the public key from Keybase.io unless already ached
    PublicKeysCache.fetch(@kb_login)
  end
end