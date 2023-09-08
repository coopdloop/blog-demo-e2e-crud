-- create the databases
CREATE DATABASE IF NOT EXISTS my_data;
-- Insert dummy data
INSERT INTO users (user_id, username, email) 
VALUES
(1,'John Doe', 'jdoe@test.com'),
(2,'Doe John', 'djohn@test.com'),
(3,'John John', 'jjohn@test.com'),
(4,'Doe Doe', 'ddoe@test.com');


FLUSH PRIVILEGES;