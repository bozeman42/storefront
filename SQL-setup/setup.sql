create table users (
id SERIAL primary key,
username VARCHAR(50) unique not NULL,
first_name VARCHAR(200) not null,
last_name VARCHAR(200) not null,
email varchar(200) not null,
password VARCHAR(300) not null,
admin boolean default false not null
);

create table items (
item_id SERIAL primary key,
name VARCHAR(200) not null,
description VARCHAR(5000),
materials VARCHAR(5000),
quantity INTEGER not NULL,
price INTEGER not NULL
);

create table images (
image_id serial primary key,
url varchar(1000),
description VARCHAR(1000),
user_id SERIAL references users
);

create table items_images (
id SERIAL primary key,
item_id SERIAL references items,
image_id SERIAL references images
);

create table categories (
category_id serial primary key,
name varchar(50) unique not null
);

create table comments (
comment_id serial primary key,
comment VARCHAR(8000) not null,
user_id serial references users,
item_id serial references items,
time timestamptz
);

create table items_categories (
id serial primary key,
item_id serial references items,
category_id serial references categories
);

-- this line is used to change the type of the price field from MONEY to INTEGER.
-- price is stored as an integer in cents.
-- ALTER TABLE "public"."items" ALTER COLUMN "price" TYPE integer USING (price::TEXT::INTEGER);