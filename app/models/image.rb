class Image < ApplicationRecord
  # アソシエーション
  mount_uploader :src, ImageUploader
  belongs_to :product
  validates :src,presence: true,format:{ with: /\/*(?i).jpeg|\/*(?i).jpg|\/*(?i).png/ }
end
