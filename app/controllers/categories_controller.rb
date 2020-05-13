class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    if @category.descendant_ids.present?
      @product = Product.where(category_id: @category.descendant_ids)      
    else
      @product = Product.where(category_id: @category.id)  
    end
  end
end