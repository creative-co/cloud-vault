require 'rails_helper'

RSpec.describe KeybaseProxyController, type: :controller do

  describe "GET #getsalt" do
    it "returns http success" do
      get :getsalt
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #login" do
    it "returns http success" do
      get :login
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #key_fetch" do
    it "returns http success" do
      get :key_fetch
      expect(response).to have_http_status(:success)
    end
  end

end
