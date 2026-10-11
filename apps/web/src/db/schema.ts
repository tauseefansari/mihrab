import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  phone: varchar('phone', { length: 20 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .primaryKey(),
  calculationMethod: integer('calculation_method').default(2).notNull(), // e.g., ISNA, MWL
  madhab: integer('madhab').default(1).notNull(), // 1: Hanafi, 0: Shafi/Hanbali/Maliki
  theme: varchar('theme', { length: 10 }).default('dark').notNull(),
  language: varchar('language', { length: 5 }).default('en').notNull(),
  latitude: varchar('latitude', { length: 50 }),
  longitude: varchar('longitude', { length: 50 }),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tasbeehLogs = pgTable('tasbeeh_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  dhikrKey: varchar('dhikr_key', { length: 50 }).notNull(),
  count: integer('count').default(0).notNull(),
  target: integer('target').default(33).notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});

export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  surahNumber: integer('surah_number').notNull(),
  ayahNumber: integer('ayah_number').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
