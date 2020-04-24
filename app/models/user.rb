class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :nickname, :family_name_kanji, :last_name_kanji, :family_name_kana, :last_name_kana, :birthday,presence: true
  has_one :address
  has_many :products
  has_many :reviews
  has_many :points
  has_many :credits
  has_many :messages
  has_many :trades
  has_many :comments
end
