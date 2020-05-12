class Shippingway < ApplicationRecord
  has_ancestry
  has_many   :products
end
