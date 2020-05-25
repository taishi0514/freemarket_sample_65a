class ItemController < ApplicationController
  before_action :home_set_product, only: [:show,:pay]
  before_action :login?, only: [:show]
  
  
  def show

   @card = Card.where(user_id: current_user.id).first

    if @card.present?
      Payjp.api_key = Rails.application.credentials.payjp[:private_key]
      customer = Payjp::Customer.retrieve(@card.payjp_id)
      @card_info = customer.cards.retrieve(customer.default_card)
      @card_brand = @card_info.brand
      @exp_month = @card_info.exp_month.to_s
      @exp_year = @card_info.exp_year.to_s.slice(2,3) 

      case @card_brand
      when "Visa"
        @card_image = "visa.png"
      when "JCB"
        @card_image = "jcb.png"
      when "MasterCard"
        @card_image = "master-card.png"
      when "American Express"
        @card_image = "american_express.png"
      when "Diners Club"
        @card_image = "dinersclub.png"
      when "Discover"
        @card_image = "discover.png"
      end
    else  
     render "card/new"
    end
   end

  def create
  end

  def pay
    card = Card.where(user_id: current_user.id).first
    Payjp.api_key = Rails.application.credentials.payjp[:private_key]
    Payjp::Charge.create(
    :amount =>@product.price.to_i,
    :customer => card.payjp_id,
    :currency => 'jpy',
  )
  redirect_to action: 'done'

  end

  def done
  end

  private

  def home_set_product
    @product = Product.find(params[:id])
    @product.update( purchaser_id: current_user.id)
    @address = Address.find_by(user_id: current_user.id)
  end

  def login?
    unless current_user.id!=@product.user_id
      redirect_to root_path,notice:"出品者は購入できません。"
    end
  end
end