import { describe, it, expect } from 'vitest';
import { getTableConfig } from 'drizzle-orm/pg-core';
import { users, userSettings, tasbeehLogs, bookmarks } from '@/db/schema';

describe('db schema definitions', () => {
  it('defines users table with correct columns', () => {
    expect(users).toBeDefined();
    expect(users.id).toBeDefined();
    expect(users.phone).toBeDefined();
    expect(users.name).toBeDefined();
    expect(users.avatarUrl).toBeDefined();
    expect(users.createdAt).toBeDefined();
    expect(users.updatedAt).toBeDefined();
  });

  it('defines userSettings table with correct columns and foreign keys', () => {
    expect(userSettings).toBeDefined();
    expect(userSettings.userId).toBeDefined();
    expect(userSettings.calculationMethod).toBeDefined();
    expect(userSettings.madhab).toBeDefined();
    expect(userSettings.theme).toBeDefined();
    expect(userSettings.language).toBeDefined();
    expect(userSettings.latitude).toBeDefined();
    expect(userSettings.longitude).toBeDefined();
    expect(userSettings.city).toBeDefined();
    expect(userSettings.country).toBeDefined();

    const config = getTableConfig(userSettings);
    expect(config.foreignKeys.length).toBeGreaterThan(0);
    expect(config.foreignKeys[0]?.reference().foreignColumns[0]).toBe(users.id);
  });

  it('defines tasbeehLogs table with correct columns and foreign keys', () => {
    expect(tasbeehLogs).toBeDefined();
    expect(tasbeehLogs.id).toBeDefined();
    expect(tasbeehLogs.userId).toBeDefined();
    expect(tasbeehLogs.dhikrKey).toBeDefined();
    expect(tasbeehLogs.count).toBeDefined();
    expect(tasbeehLogs.target).toBeDefined();
    expect(tasbeehLogs.lastUpdated).toBeDefined();

    const config = getTableConfig(tasbeehLogs);
    expect(config.foreignKeys.length).toBeGreaterThan(0);
    expect(config.foreignKeys[0]?.reference().foreignColumns[0]).toBe(users.id);
  });

  it('defines bookmarks table with correct columns and foreign keys', () => {
    expect(bookmarks).toBeDefined();
    expect(bookmarks.id).toBeDefined();
    expect(bookmarks.userId).toBeDefined();
    expect(bookmarks.surahNumber).toBeDefined();
    expect(bookmarks.ayahNumber).toBeDefined();
    expect(bookmarks.createdAt).toBeDefined();

    const config = getTableConfig(bookmarks);
    expect(config.foreignKeys.length).toBeGreaterThan(0);
    expect(config.foreignKeys[0]?.reference().foreignColumns[0]).toBe(users.id);
  });
});
