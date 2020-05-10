class CardController < ApplicationController

  require "payjp"

  def index
  end

  def new
    card = Card.where(user_id: current_user.id)
    redirect_to action: "show" if card.exists?
  end
  
  def create
  end

  def pay 
    Payjp.api_key = ENV["sk_test_c8c03289930d669ca3a34f5f"]
    if params['payjp-token'].blank?
      redirect_to action: "new"
    else
      customer = Payjp::Customer.create(
      description: '登録テスト',
      email: current_user.email,
      card: params['payjp-token'],
      metadata: {user_id: current_user.id}
      ) 
      @card = Card.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
      if @card.save
        redirect_to action: "show"
      else
        redirect_to action: "pay"
      end
    end
  end

  def show
    card = Card.where(user_id: current_user.id).first
    if card.blank?
      redirect_to action: "new" 
    else
      Payjp.api_key = ENV["sk_test_c8c03289930d669ca3a34f5f"]
      customer = Payjp::Customer.retrieve(card.customer_id)
      @default_card_information = customer.cards.retrieve(card.card_id)
    end
  end

end