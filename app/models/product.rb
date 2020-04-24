class Product < ApplicationRecord
  belongs_to :user
  belongs_to :trade
  belongs_to :categorie
  belongs_to :brand
  has_many :reviews
  has_many :comments
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
end
