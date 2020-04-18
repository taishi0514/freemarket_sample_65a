class ProductController < ApplicationController
  def show
    @user = Product.find_by(id: params[:id])
  end

  def edit
  end

  def destroy
    @Product = Product.find_by(id: params[:id])
    @Product.destroy
    redirect_to("/")
  end

  
end
