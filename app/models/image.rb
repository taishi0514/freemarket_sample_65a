class Image < ApplicationRecord
    # validates :product
    # validates :image_url, presence: true, length: { in: 1..10}
    belongs_to :product
    mount_uploader :image, ImageUploader
end
