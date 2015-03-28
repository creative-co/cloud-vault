class RequestSignature
  attr_reader :public_key_id, :timestamp, :csrf_token

  # caught in controller to prevent bad requests
  Invalid = Class.new(StandardError)

  def initialize(base64_signature)
    @signature = Base64.decode64(base64_signature)
  end

  def validate!
    do_validate!
    # rescue no key
  end

  private

  def do_validate!
    crypto = GPGME::Crypto.new
    @csrf_token = crypto.verify(@signature) do |sig|
      raise Invalid unless sig.valid?
      @public_key_id = sig.from.split.first  # e.g. => "E9DB2AB3C0AC4A98 Vladimir Yartsev <vovayartsev@gmail.com>"
      @timestamp = sig.timestamp
    end.to_s.strip
  end

  def import_key
    open("https://keybase.io/#{kb_login}/key.asc") do |f|
      GPGME::Key.import(f)
    end
  end
end