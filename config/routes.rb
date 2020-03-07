Rails.application.routes.draw do

  devise_for :users, :controllers => {
    :sessions      => "users/sessions",
    :registrations => "users/registrations",
    :passwords     => "users/passwords"
  }
  # get 'posts', to: 'users#index'
  root to: 'top#index'

end
