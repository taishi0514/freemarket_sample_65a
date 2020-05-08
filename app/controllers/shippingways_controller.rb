class ShippingwaysController < ApplicationController
  def index
    @shippingways = Shippingway.where(ancestry: params[:id])
    respond_to do |format|
      format.json
    end
  end
end
