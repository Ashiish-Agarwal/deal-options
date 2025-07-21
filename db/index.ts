// lib/db.ts (or wherever your db file is)
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as product from "@/src/db/product";
import * as schema from "@/src/db/schema";

const MergeSchema = {
  ...product,
  ...schema,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Correct syntax for drizzle with node-postgres
const db = drizzle(pool, { schema: MergeSchema });

export default db;