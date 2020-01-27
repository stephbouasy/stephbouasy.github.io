CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    bite BOOLEAN default FALSE,
    PRIMARY KEY (id)
);