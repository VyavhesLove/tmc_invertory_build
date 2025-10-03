import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const inventoryItems = pgTable("inventory_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  name: text("name").notNull(),
  serialNumber: text("serial_number").notNull(),
  status: text("status").notNull(),
  responsible: text("responsible"),
  location: text("location"),
  brigade: text("brigade"),
  repairReason: text("repair_reason"),
  repairComment: text("repair_comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInventoryItemSchema = createInsertSchema(inventoryItems).omit({
  id: true,
  createdAt: true,
});

export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;
export type InventoryItem = typeof inventoryItems.$inferSelect;

export const statusOptions = ["В ремонте", "Выдано", "Подтвердить ремонт", "На складе"] as const;
export type ItemStatus = typeof statusOptions[number];
