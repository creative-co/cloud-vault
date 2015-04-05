class RequestSignature
  attr_reader :public_key_id, :timestamp, :csrf_token

  # caught in controller to prevent bad requests
  Invalid = Class.new(StandardError)

  def initialize(base64_signature, kb_login)
    raise Invalid, 'Bad characters in kb_login' unless kb_login =~ /^[\d\w-]+$/
    @kb_login = kb_login
    @signature = Base64.decode64(base64_signature)
  end

  def validate!
    do_validate!
  rescue Invalid
    import_key
    do_validate!
  end

  private

  def do_validate!
    output = IO.popen('gpg --verify 2>&1', 'r+') do |gpg|
      gpg.write(@signature)
      gpg.close_write
      gpg.read
    end
    raise Invalid, output unless output =~ /Good signature/m
    output.each_line do |line|
      if line =~ /Signature made (.*) using .+ key ID ([\d\w]+)/
        @timestamp = Time.parse($1)
        @public_key_id = $2
      end
    end
    @csrf_token = @signature.each_line.to_a[3].strip
  end

  def import_key
    open("https://keybase.io/#{@kb_login}/key.asc") do |f|
      IO.popen("gpg -q --import", 'w') { |gpg| gpg.write(f.read) }
    end
  end
end