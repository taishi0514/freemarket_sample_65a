class ListingpageController < ApplicationController
  def index
    @product = Product.new
    @product.images.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to root_path
    else
      render :new
    end
  end

  private


  def product_params
    params.require(:product).permit(:name, :price, images_attributes: [:src])
  end
end
