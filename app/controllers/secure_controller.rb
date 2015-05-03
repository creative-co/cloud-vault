class SecureController < ApplicationController
  protect_from_forgery with: :exception
  before_filter :validate_request_signature

  def current_user
    User.where(kb_login: request_signature.kb_login).first_or_create!
  end

  rescue_from RequestSignature::Invalid, with: :render_not_authorized

  private

  def validate_request_signature
    request_signature.validate! # may raise RequestSignature::Invalid

    unless valid_authenticity_token?(session, request_signature.csrf_token)
      raise RequestSignature::Invalid
    end

    if request_signature.timestamp < 15.minutes.ago
      raise RequestSignature::Invalid
    end
  end

  private

  def request_signature
    @request_signature ||= begin
      kb_signature = request.headers['X-Kb-Signature'] or raise(ArgumentError, 'X-Kb-Signature header expected')
      kb_login = request.headers['X-Kb-Login'] or raise(ArgumentError, 'X-Kb-Login header expected')
      RequestSignature.new(kb_signature, kb_login)
    end
  end

  def render_not_authorized(e)
    render json: {error: e.message}, status: 401
  end
end
