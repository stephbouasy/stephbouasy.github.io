DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose Headphones", "Electronics", 275.00, 150),
("Yoga Leggings", "Clothing", 35, 100),
("Jaclyn Hill Palette", "Beauty", 20.00, 50),
("Paw Patrol Launch'N Haul Track", "Toys", 35.00, 75),
("Fitbit Versa", "Electronics", 125, 30),
("Em Cosmetics Lip Gloss ", "Beauty", 35.00, 200),
("Transformers Optimus Sword", "Toys", 15.00, 35),
("Levi's Men Jeans", "Clothing", 45, 100),
("iPhone XR", "Electronics", 500, 75),
("Fire HD 8", "Electronics", 50, 250);
