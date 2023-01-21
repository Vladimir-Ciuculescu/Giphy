create type material_type as ENUM('small', 'medium', 'large')


create table items (
	id serial primary key,
	description varchar(255),
	price numeric(3,2),
	image_link varchar(512),
	material varchar(255),
	size material_type
)


create table category (
	id serial primary key,
	name varchar(255),
	description varchar (255),
	unique (name)
)

alter table category
add constraint no_duplicates_on_name unique (name)

create table item_category (
	item_id int not null,
	category_id int not null,
	primary key (item_id, category_id),
	foreign key (item_id) references items(id) on update cascade,
	foreign key (category_id) references category(id) on update cascade
)


create table item_details (
	item_id int not null,
	serial varchar(255),
	lot varchar(255),
	primary key	(item_id),
	constraint fk_item_id foreign key (item_id) references items (id)
)

insert into items (description, price, image_link, material, size) values ('Ceva', 9.45, 'awdawd', 'canepa', 'medium');
insert into items (description, price, image_link, material, size) values ('altceva', 5.45, 'awdawd', 'masa', 'large');
insert into items (description, price, image_link, material, size) values ('inc altceva', 4.45, 'awdawd', 'scaun', 'small');




insert into category (name, description) values ('Electrocasnic', 'aparat electrocasnic')
insert into category (name, description) values ('Masina', 'Masina sport');
insert into category (name, description) values ('Carte', 'Cultura');


insert into item_category (item_id,category_id) VALUES(1,1)
insert into item_category (item_id,category_id) VALUES(1,2)
insert into item_category (item_id,category_id) VALUES(1,3)

insert into item_category (item_id, category_id) values (2, 2);
insert into item_category (item_id, category_id) values (3, 3);


select * from category c 
inner join item_category ic on c.id = ic.category_id 
inner join items i on i.id = ic.item_id 
where i.id = 1

select * from items i 
inner join item_category ic on ic.item_id  = i.id 
inner  join category c on c.id = ic.category_id 
where c.id = 3










