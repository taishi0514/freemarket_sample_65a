class Product < ApplicationRecord
  # belongs_to :user
  # belongs_to :categorie
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
  belongs_to :category
  belongs_to :area
end
