class Passphrase < ActiveRecord::Base
  belongs_to :user
  belongs_to :project_version
end
