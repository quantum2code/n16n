import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const workflow = pgTable("workflow", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
