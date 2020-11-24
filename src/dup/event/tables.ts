import {bigint, defineTable, text, uuid,} from '@ff00ff/mammoth';

const events = defineTable({
  eventIdentifier: uuid().primaryKey().default('gen_random_uuid()'),
  aggregateIdentifier: uuid().notNull(),
  eventSequenceNumber: bigint().notNull(),
  payload: text().notNull(),
  payloadType: text().notNull(),
});

export default events;
