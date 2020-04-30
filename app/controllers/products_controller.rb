class ProductsController < ApplicationController
  def index
    @products = Product.includes(:images).order('created_at DESC').limit(3)
  end

  def new
    @product = Product.new
    @product.images.new
  end

  def show
    @product = Product.find(params[:id])
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    @product.destroy
    redirect_to root_path
  end
  
  private
  
  def product_params
    params.require(:product).permit(:name, :price, images_attributes:  [:src, :_destroy, :id])
  end
  
  def set_product
    @product = Product.find(params[:id])
  end

end