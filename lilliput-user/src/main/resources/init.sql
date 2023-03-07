create database lilliput_user;
use lilliput_user;
create table user
(
    user_id    int          not null primary key auto_increment,
    user_name  varchar(256) not null,
    pass_word  varchar(256) not null,
    avatar     varchar(256) not null,
    active     int          not null default 0 comment '0:inactive,1:active',
    created_at datetime     not null,
    updated_at datetime     not null
);