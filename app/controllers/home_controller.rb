class HomeController < ApplicationController
  before_action :set_home, only: [:show]
  before_action :correct_user, only: [:show]

  def show
    @user = User.find(params[:id])
  end

  private


  def set_home
    @user = User.find(params[:id])
  end

  def correct_user
    unless  user_signed_in? && current_user.id==@user.id
      redirect_to root_path,notice:"自分意外のマイページを表示することはできません。"
    end
  end
end
