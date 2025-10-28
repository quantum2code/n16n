import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForPg = global as unknown as { pool: Pool };
const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;
const db = drizzle({ client: pool });

export { db };
