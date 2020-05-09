class UsersController < ApplicationController
  def index
    @products = Product.all.order(id: "DESC").first(6)
  end
end