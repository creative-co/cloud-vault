class ProjectVersion < ActiveRecord::Base
  belongs_to :author, class_name: 'User'
  has_many :passphrases

end
