import { Pool } from 'pg';
import {
  defineDb, bigint, defineTable, text, uuid,
} from '@ff00ff/mammoth';

const events = defineTable({
  eventIdentifier: uuid().primaryKey().default('gen_random_uuid()'),
  aggregateIdentifier: uuid().notNull(),
  eventSequenceNumber: bigint().notNull(),
  payload: text().notNull(),
  payloadType: text().notNull(),
});

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  password: 'example',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = defineDb({ events }, async (query, parameters) => {
  const result = await pool.query(query, parameters);

  return {
    affectedCount: result.rowCount,
    rows: result.rows,
  };
});

export default db;
