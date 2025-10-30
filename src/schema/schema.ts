import {
  serial,
  timestamp,
  jsonb,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const workflow = pgTable("workflow", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
