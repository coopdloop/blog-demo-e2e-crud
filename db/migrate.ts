import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const client = postgres({ ssl: "require" });
const db: PostgresJsDatabase = drizzle(client);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
};

main();
