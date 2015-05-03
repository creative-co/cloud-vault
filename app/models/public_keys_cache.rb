class PublicKeysCache
  include Singleton

  class << self
    delegate :fetch, :clear, to: :instance
  end

  Entry = Struct.new(:dearmored_path)

  def fetch(kb_login)
    storage.fetch(kb_login) do
      tmp = mktemp
      open("https://keybase.io/#{kb_login}/key.asc") do |f|
        IO.popen("gpg -q --dearmor > #{tmp}", 'w') { |gpg| gpg.write(f.read) }
      end
      Entry.new(tmp)
    end
  end

  def clear
    storage.values.each { |e| FileUtils.safe_unlink(e.dearmored_path) }
    storage.clear
  end

  private

  def storage
    @storage ||= {}
  end

  def mktemp
    Tempfile.new('public-key.XXXXXXXXXXXXXXXXX').tap { |t| t.close }.path
  end
end