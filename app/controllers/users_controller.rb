class UsersController < ApplicationController
  def index
    @products = Product.includes(:images).order('created_at DESC').limit(3)
  end
end