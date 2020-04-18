Rails.application.routes.draw do
  
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  devise_scope :user do
    get 'addresses', to: 'users/registrations#new_address'
    post 'addresses', to: 'users/registrations#create_address'
  end

  root to: 'users#index'
  resources :item, only: [:index]
  resources :product, only: [:edit, :show, :destroy]
  get 'listingpage/index'
end
