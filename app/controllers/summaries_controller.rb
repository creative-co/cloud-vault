class SummariesController < ApplicationController
  respond_to :json

  def index
    respond_with Summary.all_for_user(current_user)
  end
end
