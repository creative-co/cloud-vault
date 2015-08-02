require 'rails_helper'

RSpec.describe ProjectionsController, type: :controller do
  fake_authorization
  let(:projection_attributes) { {title: 'Hello World', signed_team: SpecMacros::SIGNED_TEAM, encrypted_content: '1234567', passphrases: [{kb_login: 'vovayartsev', phrase: 'some-passphrase30G'}]} }

  describe 'GET #show' do
    let(:user) { User.first_or_create! kb_login: 'vovayartsev' }
    let(:projection) { Projection.create! projection_attributes, user }
    it 'returns http success' do
      xhr :get, :show, id: projection.project_id, format: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe 'create' do
    it 'should be_success' do
      xhr :post, :create, projection: projection_attributes, format: :json
      expect(response).to be_created
    end
  end

end
