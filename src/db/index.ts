import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import * as relations from "./relations";

declare global {
  var _db:
    | ReturnType<typeof drizzle<typeof schema & typeof relations>>
    | undefined;
}

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
});

const db =
  globalThis._db ||
  drizzle(poolConnection, {
    schema: { ...schema, ...relations },
    mode: "default",
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export { db };
