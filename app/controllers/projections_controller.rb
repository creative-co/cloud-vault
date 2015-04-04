class ProjectionsController < SecureController
  respond_to :json

  def show
    respond_with Projection.new(params[:id], current_user)
  end
end
