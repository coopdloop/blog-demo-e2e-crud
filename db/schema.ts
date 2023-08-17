import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const Tasks = pgTable("Tasks", {
  task_id: serial("task_id").primaryKey(),
  user_id: integer("user_id").references(() => Users.user_id),
  task_category_id: integer("task_category_id").references(
    () => TaskCategories.task_category_id
  ),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  due_date: varchar("due_date", { length: 256 }),
  status: varchar("status", { length: 256 }),
});

// declaring enum in database
export const TaskCategoriesEnum = pgEnum("category_name", [
  "Frontend",
  "Backend",
  "Fullstack",
]);

export const TaskCategories = pgTable("TaskCategories", {
  task_category_id: serial("task_category_id").primaryKey(),
  category_name: TaskCategoriesEnum("category_name"),
  category_description: varchar("category_description", { length: 256 }),
});

export const Users = pgTable("Users", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username", { length: 256 }),
  email: varchar("email", { length: 256 }),
});
