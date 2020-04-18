class ProductController < ApplicationController
  before_action :set_product
  
  def show
  end

  def edit
  end

  def destroy
    if @Product.destroy
      flash[:notice] = "削除されました"
      redirect_to(root_path)
    else
      flash[:notice] = "削除できませんでした"
      redirect_to(root_path)
    end
  end

  private

  def set_product
    @Product = Product.find(params[:id])
  end

  
end
