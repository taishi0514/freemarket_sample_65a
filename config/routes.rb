Rails.application.routes.draw do
  
  # ユーザー情報
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  devise_scope :user do
    get 'addresses', to: 'users/registrations#new_address'
    post 'addresses', to: 'users/registrations#create_address'
  end


  # ホーム画面
  root to: 'users#index'

  # マイページ
  resources :home, only: [:show]

  # 購入画面
  resources :item, only: [:show]

  # カテゴリー
  resources :categories,only: [:index,:show]

  # サイズ
  resources :product_sizes,only: :index, defaults: {format: 'json'}
  # 発送方法
  resources :shippingways,only: :index, defaults: {format: 'json'}

  # 出品画面
  resources :listingpage, except: :index 
  post 'listingpage/create', to: 'listingpage#create'

  # カテゴリー機能
  namespace :api do
    resources :categories, only: [:index],defaults: {format: 'json'}
  end

end

