class Api::CategoriesController < ApplicationController
  def index
    @categories = Category.where(ancestry: params[:id])
    respond_to do |format|
      format.json
    end
  end
end
