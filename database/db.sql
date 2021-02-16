-- create db
CREATE DATABASE IF NOT EXISTS crudnodejsmysql DEFAULT CHARACTER SET utf8mb4;
-- use this db
USE crudnodejsmysql;
-- customers table
CREATE TABLE IF NOT EXISTS customer (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

-- describe the table we created
DESCRIBE customer;