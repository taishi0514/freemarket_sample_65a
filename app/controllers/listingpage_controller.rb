class ListingpageController < ApplicationController
  before_action :set_categories, :set_shippingways, :set_Area,only:[:new,:edit]
  before_action :set_product, except: [:index, :new, :create]

  def show
  end

  def new
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



  def edit
  end


  def destroy
    if @product.destroy
      flash[:notice] = "削除されました"
      redirect_to(root_path)
    else
      flash[:notice] = "削除できませんでした"
      redirect_to(root_path)
    end
  end

  def update
    if @product.update(product_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def set_categories
    @categories = []
    @categories.push(Category.new(id:0,name:"---"))
    @categories.concat(Category.where(ancestry: nil))
  end
  def set_shippingways
    @shippingways = []
    @shippingways.push(Shippingway.new(id:0,name:"---"))
    @shippingways.concat(Shippingway.where(ancestry: nil))
  end
  def set_Area
    @Area = []
    @Area = Area.all.order("id ASC")
  end


  def product_params
    params.require(:product).permit(:title, :detail, :category, :brand, :condition, :ship_fee, :ship_area, :ship_period, :price, images_attributes: [:src])
  end

  def set_product
    @product = Product.find(3)
  end
end
