class Shippingway < ApplicationRecord
  # アソシエーション
  has_ancestry
  has_many   :products
end
