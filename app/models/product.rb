class Product < ApplicationRecord
  # associations
  belongs_to    :category
  belongs_to    :area
  belongs_to    :product_size, optional: true
  belongs_to    :shippingway,  optional: true
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
end
