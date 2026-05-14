DROP DATABASE IF EXISTS onlinefoodordering_db;
CREATE DATABASE onlinefoodordering_db;
USE onlinefoodordering_db;

CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    phone CHAR(10) 
);

CREATE TABLE food(
    fid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    description TEXT,
    price DECIMAL(9,2),
    image VARCHAR(100) 
);

CREATE TABLE orders(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    total DECIMAL(9,2),
    odate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ddate TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES users(uid) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE orderdetails(
    od_id INT PRIMARY KEY AUTO_INCREMENT,
    oid INT,
    fid INT,
    qty INT,
    FOREIGN KEY (oid) REFERENCES orders(oid) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (fid) REFERENCES food (fid) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO food(name,description,price,image)
VALUES ('Pav Bhaji','Bombay-style bhaji made with fresh vegetables and flavorful spices + 2 Pavs [4 Pc] + Onions', 229,'PavBhaji.jpg');

INSERT INTO food(name,description,price,image)
VALUES ('Blueberry Ice Cream','Inspired by the desserts at the local Greek patisseries. This indulgent ice cream is made of tarty blueberries smothered in fine cheesecake. Silky smooth & super creamy!
', 99,'icecream.jpg');