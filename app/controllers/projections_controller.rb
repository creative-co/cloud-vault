class ProjectionsController < SecureController
  respond_to :json

  def show
    respond_with Projection.new(params[:id], current_user)
  end

  def create
    respond_with Projection.create!(projection_params, current_user)
  end

  def update
    respond_with Projection.create!(projection_params, current_user)
  end

  private

  def projection_params
    params.require(:projection)
        .permit(:title, :signed_team, :encrypted_content, passphrases: [:kb_login, :phrase])
  end

end
