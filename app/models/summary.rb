class Summary < Struct.new(:title)
  def self.all_for_user(user)
    return [
        new("First project"),
        new("Second project"),
        new("Private passwords")
    ]
  end
end