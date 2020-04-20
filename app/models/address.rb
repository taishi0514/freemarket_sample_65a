class Address < ApplicationRecord
  belongs_to :user, optional: true
  validates :zipcode, :address, :prefecture_name, :cities_name,presence: true
  validates :family_name_kanji, :last_name_kanji, :family_name_kana, :last_name_kana,
    format: { with: /\A[ぁ-んァ-ン一-龥]/, message: 'は全角で入力して下さい。'}
end