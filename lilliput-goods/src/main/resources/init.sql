create database lilliput_goods;
use lilliput_goods;
create table goods
(
    id int not null primary key auto_increment,
   	name varchar(32) not null ,
   	price int not null ,
   	pic varchar(128),
   	description varchar(256),
   	tag varchar(32) comment 'related goods has same tag'
   	extends varchar(1024) comment 'extend fields'
   	quantity int not null
);

