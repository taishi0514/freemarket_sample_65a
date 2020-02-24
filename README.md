## user 
|Column|Type|Options|
|------|----|-------|
|name|string||null: false|
|e-mail|string||null: false|
|addrece_id||string|null :false|
|picture_id|image|
|comment_id||string|

### Assocition

- belong_to :picture
- belong_to :address
- belong_to :comment
- belong_id :product

##  product

|Column|Type|Options|
|------|----|-------|
|user_id|string||null: false|
|picture_id|image|

### Assocition

- belong_to :user
- belong_to :picture

### Address

|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false|
|address|string|null: false|

### Association

- belong_to :user_id

##  pictures

|Columm|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association

 - has_many :user
 - has_many :product
##  comment

|Columm|Type|Options|
|------|----|-------|
|name|string|null: false|
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
