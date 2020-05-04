class Category < ApplicationRecord
  has_many :products
  has_ancestry
  has_many   :product_sizes, through: :category_sizes
end
