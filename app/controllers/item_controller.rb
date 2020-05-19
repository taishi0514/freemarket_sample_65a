class ItemController < ApplicationController
  before_action :home_set_product, only: [:show]
  before_action :login?, only: [:show]
  
  def show
  end

  private

  def home_set_product
    @product = Product.find(params[:id])
    @address = Address.find_by(user_id: current_user.id)
  end

  def login?
    unless current_user.id!=@product.user_id
      redirect_to root_path,notice:"出品者は購入できません。"
    end
  end
end