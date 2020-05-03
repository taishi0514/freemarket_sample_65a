class Area < ApplicationRecord
  # associations
  has_many :addresses
  has_many :products
end