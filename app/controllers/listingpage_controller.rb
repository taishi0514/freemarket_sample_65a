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
    if @product.price.nil?
      redirect_to new_listingpage_path, notice:"販売価格を入力してください"
      return
    end

    if params[:images] 
      if @product.save
        params[:images]['src'].each do |img|
          @image = @product.images.create(src: img, product_id: @product.id)
        end
      else
        redirect_to new_listingpage_path, notice:"必要な情報が不足していたため商品が登録できませんでした。"
        return
      end
      @product = Product.find(@product.id)
      redirect_to listingpage_path(@product.id)
    else 
      redirect_to new_listingpage_path, notice:"画像がない商品は登録できません。"
      return
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
    if product_params[:images_attributes]
      @product.update(product_params)
      redirect_to listingpage_path(@product.id)
      return
    end
    redirect_to edit_item_path(@item.id), notice:"画像がない商品は登録できません。"
  end

  private

  def set_categories
    @categories = []
    @categories.push(Category.new(id:0,name:"選択してください"))
    @categories.concat(Category.where(ancestry: nil))
  end
  def set_shippingways
    @shippingways = []
    @shippingways.push(Shippingway.new(id:0,name:"選択してください"))
    @shippingways.concat(Shippingway.where(ancestry: nil))
  end
  def set_Area
    @Area = []
    @Area = Area.all.order("id ASC")
  end

  def product_params
    params.require(:product).permit(:title,:detail,:category_id,:brand,:condition,:shippingway_id,:product_size_id,:area_id,:ship_period,:price, [images_attributes: [:id, :image]])
  end

  def set_product
    @product = Product.find(2)
  end
end
