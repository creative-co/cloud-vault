require 'rails_helper'

RSpec.describe ProjectionsController, type: :controller do
  before { allow(controller).to receive(:request_signature).and_return(double(:request_signature, validate!: true, kb_login: 'vovayartsev', csrf_token: '123', timestamp: Time.now)) }

  pending "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

end
