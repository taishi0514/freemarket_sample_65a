class CategorySize < ApplicationRecord
  belongs_to :category
  belongs_to :product_size
end
