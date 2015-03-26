class SummariesController < ApplicationController
  def index
    render json: Summary.all_for_user(current_user)
  end
end
