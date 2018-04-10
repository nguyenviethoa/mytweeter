## Installation

```sh
npm install
```

## Run the server

```sh
npm start
```

## Run tests

```sh
npm test
```

// local home postgres : role: nguyenviethoa pass =tweeter

CREATE TABLE users(
   ID text PRIMARY KEY     NOT NULL,
   usernam           TEXT    NOT NULL,
   first_name            TEXT,
   last_name        TEXT,
   full_name TEXT,
   avatar_url TEXT
);

CREATE TABLE tweets(
   ID text PRIMARY KEY      NOT NULL,
   body           text NOT NULL,
   date DATE,
   author_id         text      references users(ID)
);

insert into users (id, username, first_name, last_name, full_name, avatar_url) values('user1', 'nguyenviethoa', 'nguyen', 'viethoa', 'nguyenviethoa', 'google.com')

insert into tweets (id, body, date, author_id) values ('tweet1', 'this is the first tweet', '2018-02-02', 1);