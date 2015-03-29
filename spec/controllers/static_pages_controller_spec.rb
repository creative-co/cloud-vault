require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
  render_views

  describe "GET #landing" do
    it "returns http success" do
      get :landing
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #vault" do
    it "returns http success" do
      get :vault
      expect(response).to have_http_status(:success)
    end
  end

end
