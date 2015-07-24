require 'rails_helper'

RSpec.describe ProjectionsController, type: :controller do
  before { allow(controller).to receive(:request_signature).and_return(double(:request_signature, validate!: true, kb_login: 'vovayartsev', csrf_token: '123', timestamp: Time.now)) }

  pending "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

  describe 'create' do
    fake_authorization
    let(:attributes) { {title: 'Hello World', signed_team: SpecMacros::SIGNED_TEAM, encrypted_content: '1234567', passphrases: {vovayartsev: 'some-passphrase30G'}} }
    it 'should be_success' do
      xhr :post, :create, projection: attributes, format: :json
      expect(response).to be_created
    end
  end

end
