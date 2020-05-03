class Category < ApplicationRecord
    has_many :products
    validates :category, presence: true
    enum category: { レディース: 1, メンズ: 2, ベビー・キッズ: 3, インテリア・住まい・小物: 4}, _prefix: true
end
