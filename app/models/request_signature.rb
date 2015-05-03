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
    public_key = PublicKeysCache.fetch(@kb_login)
    output = IO.popen("gpg --no-default-keyring --keyring #{public_key.dearmored_path} --verify 2>&1", 'r+') do |gpg|
      gpg.write(@signature)
      gpg.close_write
      gpg.read
    end
    raise Invalid, output unless output =~ /Good signature/m
    output.each_line do |line|
      if line =~ /Signature made (.*) using .+ key ID [\d\w]+/
        @timestamp = Time.parse($1)
      end
    end
    @csrf_token = IO.popen("gpg --no-default-keyring --keyring #{public_key.dearmored_path} --decrypt 2>/dev/null", 'r+') do |gpg|
      gpg.write(@signature)
      gpg.close_write
      gpg.read
    end.strip
  end

end