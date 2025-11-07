import { serial, timestamp, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const workflow = pgTable("workflow", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(user, ({ many }) => ({
  workflows: many(workflow),
}));
