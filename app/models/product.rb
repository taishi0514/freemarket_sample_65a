class Product < ApplicationRecord
  # associations
  belongs_to    :category
  belongs_to    :product_size, optional: true
  belongs_to    :shippingway,  optional: true
  has_many :images,dependent: :destroy
end
