import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

// declaring enum in database
export const TaskStatusEnum = pgEnum("status", [
  "New",
  "In Progress",
  "Closed",
  "Reopened",
  "Resolved",
  "Rejected"
]);

// declaring enum in database
export const TaskCategoriesEnum = pgEnum("category_name", [
  "Frontend",
  "Backend",
  "Fullstack",
]);

export const Tasks = pgTable("tasks", {
  task_id: serial("task_id").primaryKey(),
  user_id: integer("user_id").references(() => Users.user_id),
  task_category_name: TaskCategoriesEnum("category_name"),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  due_date: varchar("due_date", { length: 256 }),
  status: TaskStatusEnum('status')
});

export const Users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username", { length: 256 }),
  email: varchar("email", { length: 256 }),
});
