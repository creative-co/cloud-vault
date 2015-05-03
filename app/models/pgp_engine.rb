module PgpEngine
  extend self

  Signature = Struct.new(:valid?, :content, :timestamp)

  def verify(signature, public_key)
    output = process_with_key('--verify', '2>&1', signature, public_key)
    if output =~ /Good signature/m
      timestamp = extract_timestamp(output)
      content = process_with_key('--decrypt', '2>/dev/null', signature, public_key)
      Signature.new(true, content, timestamp)
    else
      Signature.new(false, nil, nil)
    end
  end

  private

  def extract_timestamp(output)
    if output =~ /Signature made (.*) using .+ key ID [\d\w]+/m
      Time.parse($1)
    else
      raise "Unexpected GPG output:\n#{output}"
    end
  end

  def process_with_key(command, redirect, message, key)
    IO.popen("gpg --no-default-keyring --keyring #{key.dearmored_path} #{command} #{redirect}", 'r+') do |gpg|
      gpg.write(message)
      gpg.close_write
      gpg.read
    end
  end

end