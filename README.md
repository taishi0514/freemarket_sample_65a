
## usersテーブル 
|Column|Type|Options|
|------|----|-------|
|user_id|references||null: false|
|profile|references||null: false|
|picture_aba|references|null :false|
|payment|string|null: false|
|password||string|null: false|
|nickname|string|null: false|
|last_name|string|null: false|
|kana_last_name|string|null: false|
|kana_first_name|string|null: false|
|have_points|string|null: false|
|first_name|string|null: false|
|e-mails|string|null: false|
|birthday|date|null: false|

### Assocition

- has_many :products
- has_many :reviews
- has_many :points
- has_many :credits
- has_many :messages
- has_many :trades
- has_one :address
- has_many :comments

## productsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false|foreign_key: true|
|trade_id|string|null: false|
|title|string|null: false|
|size_id|references|null: false|foreign_key: true|
|shipping_id|string|null: false|
|ship_period|timestamp|null: false|
|ship_method|string|null: false|
|ship_area|string|null: false|
|price|string|null: false|
|likes_count|string|null: false|
|detail|string|null: false|
|condition|string|null: false|
|category_id|string|null: false|
|brand_id|date|null: false|

### Assocition

- belong_to :user
- belong_to :trade
- belong_to :categories
- has_many :images
- has_many :reviews
- has_many :comments

### tradesテーブル

|Column|Type|Options|
|------|----|-------|

|vender_id|references|null: false|foreign_key: true|
|product_id|references|null: false|foreign_key: true|
|customer_id|references|null: false|foreign_key: true|

### Association

- belong_to :user
- belong_to :product

##  likesテーブル

|Columm|Type|Options|
|------|----|-------|
|user_id|references|null: false|foreign_key: true|
|product_id|references|null: false|foreign_key: true|

### Association

 - belong_to :user

## reviewsテーブル

|Columm|Type|Options|
|------|----|-------|
|trade_id|references|null: false|foreign_key: true|
|reviewer_id|references|null: false|foreign_key: true|
|reviewed_id|references|null: false|foreign_key: true|
|review|string|null: false|
|rate|string|null: false|

### Association

 - belong_to :user
 - belong_to :product

## addressテーブル

|Columm|Type|Options|
|------|----|-------|
|tell_num|string|null: false|
|post_code|string|null: false|
|prefecture_name|string|null: false|
|cities_name|string|null: false|
|building_name|string|null: false|
|address_num|string|null: false|
|user_id|references|null: false|foreign_key: true|

### Association

 - belong_to :user

## pointsテーブル

|Columm|Type|Options|
|------|----|-------|
|user_id|references|null: false|foreign_key: true|
|point|string|null: false|

### Association

 - belong_to :user

## imagesテーブル

|Columm|Type|Options|
|------|----|-------|
|product_id|references|null: false|foreign_key: true|
|images_url|string|null: false|

### Association

 - belong_to :product

## commentsテーブル

|Columm|Type|Options|
|------|----|-------|
|review_id|references|null: false|foreign_key: true|
|comment|string|null: false|
|user_id|references|null: false|foreign_key: true|

### Association

 - belong_to :user
 - belong_to :product

## creditテーブル

|Columm|Type|Options|
|------|----|-------|
|user_id|references|null: false|foreign_key: true|
|expiration_date|references|null: false|foreign_key: true|
|card_num|references|null: false|foreign_key: true|

### Association

 - belong_to :user

## categoriesテーブル

|Columm|Type|Options|
|------|----|-------|
|category|string|null: false|

### Association

 - has_many :products
















