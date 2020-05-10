class ProductSizesController < ApplicationController
  def index
    @product_sizes = ProductSize.where(ancestry: CategorySize.find_by(category_id: params[:id]).product_size_id)
    respond_to do |format|
      format.json
    end
  end
end
