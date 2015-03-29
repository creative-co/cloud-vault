class SecureController < ApplicationController
  protect_from_forgery with: :exception
  before_filter :validate_request_signature

  def current_user
    User.where(public_key_id: request_signature.public_key_id)
  end

  rescue_from RequestSignature::Invalid, with: :render_not_authorized

  private

  def validate_request_signature
    request_signature.validate! # may raise RequestSignature::Invalid

    unless valid_authenticity_token?(session, request_signature.csrf_token)
      puts "TODO: CSRF Token: #{request_signature.csrf_token}"
      # raise RequestSignature::Invalid
    end

    puts "TODO: Timestamp: #{request_signature.timestamp}"
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
