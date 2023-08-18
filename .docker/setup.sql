-- create the databases
CREATE DATABASE IF NOT EXISTS my_data;
-- Insert dummy data
INSERT INTO "TaskCategories" (category_name, category_description)
VALUES
    ('Frontend', 'Tasks related to front end design.'),
    ('Backend', 'Tasks related to back end design.'),
    ('Fullstack', 'Tasks related to front and back end design.');

FLUSH PRIVILEGES;