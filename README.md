# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|strin|null: false|
|user_id|integer|foreign_key: true|
### Association
- has_many :members
- has_many :comments
- has_many :groups_tags
- has_many  :users,  through:  :groups_tags

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user