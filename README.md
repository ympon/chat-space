# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

#ChatSpaceのDB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :groups, through: :groups_users
- has_many :posts

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null :false|
|user_id|integer|null :false, foreign_key: true|
|post_id|integer|null: false, foreign_key: true| 
### Association
- has_many :users, through: :groups_users
- has_many :posts, through: :groups_posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|null :false|
|image|text||
|user_id|integer|null: false|
### Association
- belongs_to :user
- has_many :groups, through: :groups_posts

## groups_postsテーブル
|Column|Type|Options|
|------|----|-------|
|groups_id|integer|null: false, foreign_key: true| 
|post_id|integer|null: false, foreign_key: true| 
### Association
- belongs_to :group
- belongs_to :post

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
