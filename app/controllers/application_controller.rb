class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    User.new(kb_login: 'guest')
  end

  private

  def request_signature
    @request_signature ||= RequestSignature.new(headers['X-Kb-Signature'] || raise(ArgumentError, 'X-Kb-Signature header expected'))
  end
end
