class Image < ApplicationRecord
  belongs_to :product
  belongs_to :animal, optional: true
  mount_uploader :image_url, ImageUploader
end
