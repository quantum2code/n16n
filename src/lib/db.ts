import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema/schema";
import * as authSchema from "@/schema/auth-schema";
const globalForPg = global as unknown as { pool: Pool };
const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;
const db = drizzle(pool, {
  schema: { ...schema, ...authSchema },
});

export { db };
