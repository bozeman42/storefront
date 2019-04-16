create table "users" (
	id SERIAL primary key,
	username VARCHAR(50) unique not NULL,
  first_name VARCHAR(200) not null,
  last_name VARCHAR(200) not null,
  email varchar(200) not null,
  password VARCHAR(300) not null
);

create table accounts (
	account_id serial primary key,
	name varchar(100) unique not null,
	
)

create table items (
	item_id SERIAL primary key,
	name VARCHAR(200) not null,
	description VARCHAR(5000),
	materials VARCHAR(5000),
	price MONEY not NULL
);

create table images (
	image_id serial primary key,
	url varchar(1000),
	user_id SERIAL references users
);

create table categories (
	category_id serial primary key,
	name varchar(50) unique
);

create table comments (
	comment_id serial primary key,
	comment VARCHAR(8000) not null,
	user_id serial references users,
	item_id serial references items,
	time timestamptz
)

create table user_types (
	id serial primary key,
	
)

create table items_categories (
	id serial primary key,
	item_id serial references items,
	category_id serial references categories
);