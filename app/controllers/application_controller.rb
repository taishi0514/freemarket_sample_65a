class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :basic_auth, if: :production?

  private

  def production?
    Rails.env.production?
  end

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found 

  def record_not_found(e) 
    @exception = e
    render 'errors/record_not_found'
  end 

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :family_name_kanji, :last_name_kanji, :family_name_kana, :last_name_kana, :birthday])
  end
end