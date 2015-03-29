class Summary < Struct.new(:id, :title)
  def self.all_for_user(user)
    return [ ]
  end
end