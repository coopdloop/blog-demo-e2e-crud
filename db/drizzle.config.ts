import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
// dotenv.config( { path: "./.env.local" });

dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST!,
    port: process.env.PGPORT as unknown as number,
    database: process.env.PGDATABASE!,
  },
} satisfies Config;
