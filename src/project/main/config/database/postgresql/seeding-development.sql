drop table if exists dev.user_profile cascade;

create table if not exists dev.user_profile (
	id serial PRIMARY KEY,
	name VARCHAR (50) UNIQUE NOT NULL,
	description VARCHAR (50) NOT NULL
);

drop table if exists dev.user cascade;

create table if not exists dev.user (
	id serial PRIMARY KEY,
	user_profile_id INT not null,
	name VARCHAR (255) NOT NULL,
	email VARCHAR (255) unique NOT null,
	password varchar(255) not null,
	foreign key (user_profile_id)
		references dev.user_profile (id)
);

drop table if exists dev.category cascade;

create table if not exists dev.category (
	id serial PRIMARY KEY,
	name VARCHAR (50) UNIQUE NOT NULL,
	description VARCHAR (50) NOT NULL
);

drop table if exists dev.product cascade;

create table dev.product (
	id serial PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	price money NOT null,
	description text not null,
	brand varchar(255) not null,
	quantity smallint not null,
	seller_id INT not null,
	category_id int not null,
	foreign key (seller_id)
		references dev.user (id),
	foreign key (category_id)
		references dev.category (id)
);

drop table if exists dev.user_reviews_product cascade;

create table dev.user_reviews_product (
	user_id integer not null,
	product_id integer not null,
	score smallint not null,
	review text not null,
	primary key(user_id, product_id),
	foreign key (user_id)
		references dev.user (id),
	foreign key (product_id)
		references dev.product (id)
);

insert into dev.user_profile (name, description)
values 	('Consumer', 'Normal user with consumer intentions'),
		('Seller', 'User that sells products');
	
insert into dev.category (name, description)
values  ('Electronics', 'Electronic devices'),
		('Cleaning', 'Products to clean objects or environments');