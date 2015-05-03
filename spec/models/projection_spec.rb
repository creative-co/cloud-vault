require 'rails_helper'

describe Projection do
  let(:user) { User.create(kb_login: 'vovayartsev') }
  let(:project) { Project.create!(version_number: 1, title: 'First Project') }

  ENCRYPTED_CONTENT = '123123123'
  TEAM = 'ASDFASDFASDFASDFASDF'
  PHRASE = '123123123'

  before do
    project_version = project.project_versions.create!(version_number: 1, content: ENCRYPTED_CONTENT, author: user, team: TEAM)
    project_version.passphrases.create!(user: user, phrase: PHRASE)
  end

  let(:projection) { Projection.new(project.id, user) }

  it 'should initialize' do
    expect(projection.passphrase).to eq(PHRASE)
  end
end