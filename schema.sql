USE bamazon;

CREATE TABLE products (
	item_id INT(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL, 
    department_name VARCHAR(50) NOT NULL, 
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11) NOT NULL, 
    PRIMARY KEY (item_id)
    );
    
SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("NBA 2K19", "GAMING", 59.95, 20),
	("Pokemon Sun", "GAMING", 39.95, 15),
    ("Pokemon Moon", "GAMING", 39.95, 15),
    ("Skyscraper", "MOVIES", 19.99, 10),
    ("The Incredibles", "MOVIES", 19.99, 12),
    ("Harry Potter: The Complete Collection", "MOVIES", 49.96, 8),
    ("Shrek", "MOVIES", 15.00, 4),
    ("Tha Carter V", "MUSIC", 13.49, 30),
    ("Ready to Die", "MUSIC", 12.49, 12),
    ("All Eyez On Me", "MUSIC", 13.99, 10);