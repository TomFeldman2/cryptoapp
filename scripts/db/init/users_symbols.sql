CREATE TABLE IF NOT EXISTS users_symbols
(
    id      int auto_increment,
    user_id int,
    symbol  varchar(3) not null,
    primary key (id),
    foreign key (user_id) references users (id)
);