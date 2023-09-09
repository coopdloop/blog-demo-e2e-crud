-- create the databases
CREATE DATABASE IF NOT EXISTS my_data;
-- Insert dummy data
INSERT INTO users (user_id, username, email) 
VALUES
(1,'admin', 'admin@domain.com'),
(2,'user', 'user@domain.com'),
(3,'John Doe', 'jdoe@domain.com'),
(4,'Alice Bob', 'abob@domain.com');

INSERT INTO tasks (task_id, user_id, task_category_name, title, description, due_date, status) 
VALUES
(1,1, 'Frontend','Create a UI library','Create a full UI library that reflects the company','11-01-2023','new'),
(2,1, 'Backend', 'Create /api/v1/delete-user endpoint','Allow for user deletion by admin role','01-01-2024','In Progress'),
(3,3, 'Backend','Create /api/v1/create-epic endpoint','Allow for user to create an epic','10-01-2023','new'),
(4,4, 'Fullstack','Create middleware.ts for app','Create a middleware.ts file that will be used for the app','12-05-2023','In Progress');

FLUSH PRIVILEGES;