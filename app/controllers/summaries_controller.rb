class SummariesController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Summary.all_for_user(current_user) }
      format.html
    end
  end
end
