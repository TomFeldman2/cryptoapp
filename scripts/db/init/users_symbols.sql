CREATE TABLE IF NOT EXISTS users_symbols
(
    id      int auto_increment,
    user_id int,
    symbol  varchar(3) not null,
    primary key (id),
    foreign key (user_id) references users (github_id),
    constraint unique_user_id_symbol unique (user_id, symbol)
);