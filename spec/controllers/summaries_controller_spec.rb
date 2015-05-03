require 'rails_helper'

RSpec.describe SummariesController, type: :controller do
  before { allow(controller).to receive(:request_signature).and_return(double(:request_signature, validate!: true, kb_login: 'vovayartsev', csrf_token: '123', timestamp: Time.now)) }
  describe "GET #index" do
    it "returns http success" do
      get :index, format: 'json'
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to be_an(Hash)
    end
  end

end
