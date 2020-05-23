class CardController < ApplicationController
  require "payjp"
  before_action :set_card, except: [:index,:new,:create,:destroy]

  def index
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
     render "new"
    end
  end

  def new
    # @card = Card.new
    @card = Card.where(user_id: current_user.id).first
     redirect_to action: "index" if @card.present?    
  end

  def create
    # Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    Payjp.api_key = Rails.application.credentials.payjp[:private_key]
    if params['payjpToken'].blank?
      render "new"
    else
      customer = Payjp::Customer.create(
        description: 'test',
        email: current_user.email,
        card: params['payjpToken'],
        metadata: {user_id: current_user.id}
      )
      @card = Card.new(user_id: current_user.id, payjp_id: customer.id)
      if @card.save!
        # if request.referer&.include?("/registrations/step5")
        #   redirect_to controller: 'registrations', action: "step6"
        # else
        #   redirect_to url:"card_index_path",method: :post, notice:"支払い情報の登録が完了しました"
        # end
      else
        render 'new'
      end
    end
  end


 def destroy
   
   @card = Card.where(user_id: current_user.id).first

   Payjp.api_key = Rails.application.credentials.payjp[:private_key]
   customer = Payjp::Customer.retrieve(@card.payjp_id)
   customer.delete
   if @card.destroy
    render 'destroy', notice: "削除しました"
   else
    redirect_to action: "index", alert: "削除できませんでした"
   end
  end


  private

  def set_card
     @card = Card.find(params[:id])
      # @card = Card.where(user_id: current_user.id).first if Card.where(user_id: current_user.id).present?
  end
end