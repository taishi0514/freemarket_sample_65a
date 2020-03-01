## users
|Column|Type|Options|
|------|----|-------|
|name|string||null: false|
|e-mail_id|string||null: false|
|address_id||string|null: false|
|picture|image||
|comment_id|string||
|password|string|null: false|
|nickname|string|null: false|
|number|string|null: false|
|profile||

### Assocition

- belongs_to :picture
- belongs_to :address
- belongs_to :comment
- belongs_to :product

##  products

|Column|Type|Options|
|------|----|-------|
|user_id|string||null: false|
|picture|image|

### Assocition

- belongs_to :user
- belongs_to :picture

### Address

|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false|
|address_id|string|null: false|

### Association

- belongs_to :user_id

##  pictures

|Columm|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association

 - has_many :user
 - has_many :product

##  comments

|Columm|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|text|text|null: false|

### Association

 - has_many :user
 - has_many :product
 - has_many :categories

##  categories

|Columm|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association

 - has_many :product
 - has_many :pictures
