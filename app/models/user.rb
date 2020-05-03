class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :nickname, :family_name_kanji, :last_name_kanji, :family_name_kana, :last_name_kana, :birthday,presence: true
  has_one :address
  has_many :products
  has_many :credits
end
