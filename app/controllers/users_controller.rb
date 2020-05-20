class UsersController < ApplicationController
  def index
    @products = Product.order('products.created_at desc').limit(3)
  end
end