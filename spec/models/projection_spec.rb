require 'rails_helper'

describe Projection do
  let(:user) { User.create(kb_login: 'vovayartsev') }
  let(:project) { Project.create!(version_number: 1, title: 'First Project') }

  TEAM = 'ASDFASDFASDFASDFASDF'
  PHRASE = '123123123'

  describe 'reading from DB' do
    before do
      project_version = project.project_versions.create!(version_number: 1, encrypted_content: '1234567', author: user, team: TEAM)
      project_version.passphrases.create!(user: user, phrase: PHRASE)
    end

    let(:projection) { Projection.new(project.id, user) }

    it 'should initialize' do
      expect(projection.passphrase).to eq(PHRASE)
    end
  end

  describe 'creating a new one' do
    let(:attributes) { {title: 'Hello World', signed_team: SpecMacros::SIGNED_TEAM, encrypted_content: '1234567', passphrases: {vovayartsev: 'some-passphrase30G'}} }
    let(:author) { User.create!(kb_login: 'vovayartsev') }
    it 'should populate DB' do
      projection = Projection.create!(attributes, author)
      expect(projection.title).to be_present
      expect(projection.version_number).to be_present
      expect(projection.encrypted_content).to be_present
      expect(projection.team).to be_present
    end
  end
end