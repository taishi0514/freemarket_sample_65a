class ItemController < ApplicationController
  before_action :login?, only: [:show]
  
  def show
    @product = Product.find(params[:id])
  end

  private

  def login?
    if current_user == nil
      redirect_to("/users/sign_in")
    end
  end

end