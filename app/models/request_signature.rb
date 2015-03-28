class RequestSignature
  delegate :kb_login, :timestamp, :csrf_token, to: :message

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
    crypto.verify(@signature) { |sig| raise Invalid unless sig.valid? }
  end

  def import_key
    open("https://keybase.io/#{kb_login}/key.asc") do |f|
      GPGME::Key.import(f)
    end
  end

  attr_reader :message

  class Message < Struct.new(:kb_login, :timestamp, :csrf_token)
    def initialize(signature)
      login, ts, token = signature.each_line.map(&:strip).drop_while(&:present?)[1].split(' / ')
      raise Invalid, "not a csrf_token: #{token}" unless token.is_a?(String)
      timestamp = Time.parse(ts)
      super(login, timestamp, token)
    rescue StandardError => e
      raise Invalid, "#{e.class.name}: #{e.message}"
    end
  end

  def message
    @message ||= Message.new(@signature)
  end
end