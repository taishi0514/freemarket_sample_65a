class Product < ApplicationRecord
  # belongs_to :user
  belongs_to :category
  belongs_to :shippingway
  belongs_to :area
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
end
