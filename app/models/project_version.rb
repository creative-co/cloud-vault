class ProjectVersion < ActiveRecord::Base
  belongs_to :author, class_name: 'User'
  has_many :passphrases
  before_validation :fill_version_number, unless: :version_number

  private

  def fill_version_number
    self.version_number = (self.class.maximum(:version_number) || 0) + 1
  end

end
