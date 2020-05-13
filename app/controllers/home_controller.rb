class HomeController < ApplicationController
  before_action :login?, only: [:show]
  def show
    @user = User.find(params[:id])
  end

  def login?
    if current_user == nil
      redirect_to("/users/sign_in")
    end
  end
end
