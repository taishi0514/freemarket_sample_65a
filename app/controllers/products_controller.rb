class ProductsController < ApplicationController

  # GET /products
  # GET /products.json
  def index
    # @products = Product.all
    @products = Product.includes(:images).order('created_at DESC').limit(3)
  end

  # GET /products/1
  # GET /products/1.json
  def show
  end

  # GET /products/new
  def new
    @product = Product.new
    @product.images.new
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to root_path
    else
      render :new
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  before_action :set_product, except: [:index, :new, :create]

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
