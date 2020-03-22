class ProdactController < ApplicationController
  def index
  end
  
  def show
    @post = Prodact.find_by(id: params[:id])
  end

  def edit
  end

  def destroy
  end
end
