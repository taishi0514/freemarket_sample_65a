class Product < ApplicationRecord
  # アソシエーション
  belongs_to    :user
  belongs_to    :category
  belongs_to    :area
  belongs_to    :product_size, optional: true
  belongs_to    :shippingway,  optional: true
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  # バリレーション

  # ユーザーID・地域ID・カテゴリーID・発送方法ID 空でない事 数字である事
  validates :user_id,:area_id,:category_id,:shippingway_id, presence: true,numericality: true
  # タイトル・ブランド 空でない事 200文字以内
  validates :title,:brand, presence: true, length: {maximum: 200}
  # 説明 空でない事 1000文字以内
  validates :detail, presence: true, length: {maximum: 1000}
  # コンディション 空でない事 
  validates :condition, presence: true
  # 価格 300以上10000000以下or等しく 空でない事
  validates :price,presence: true ,numericality: {greater_than_or_equal_to: 300,less_than:99999999999}
end

