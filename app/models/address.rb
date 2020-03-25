class Address < ApplicationRecord
  belongs_to :user, optional: true
  validates :zipcode, :address, :family_name_kanji, :last_name_kanji,:family_name_kana, :last_name_kana, :prefecture_name, :cities_name,presence: true
end