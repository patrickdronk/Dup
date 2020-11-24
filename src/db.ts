import {defineDb} from '@ff00ff/mammoth';
import {Pool} from 'pg';
import events from './dup/event/tables';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = defineDb({events}, async (query, parameters) => {
  const result = await pool.query(query, parameters);

  return {
    affectedCount: result.rowCount,
    rows: result.rows,
  };
});

export default db;
