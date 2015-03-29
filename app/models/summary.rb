class Summary < Struct.new(:id, :title)
  def self.all_for_user(user)
    return [
        new(1, "First project"),
        new(2, "Second project"),
        new(3, "Private passwords")
    ]
  end

  alias :read_attribute_for_serialization :send
end