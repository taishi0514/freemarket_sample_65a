Rails.application.routes.draw do
  devise_for :users
  root to: 'users#index'
  get "prodact/index/:id" => "prodact#index"
  get "prodact/edit/:id" => "prodact#edit"
  get "prodact/show/:id" => "prodact#show"  
end










