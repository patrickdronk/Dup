import db from "../../db";

interface DomainEvent {
    eventIdentifier: string
    aggregateIdentifier: string
    eventSequenceNumber: string
    payload: string
    payloadType: string
}

class EventRepository {
    async getAllDomainEventsByAggregateId(aggregateId: string): Promise<DomainEvent[]> {
        return db.select(db.events.eventIdentifier, db.events.aggregateIdentifier, db.events.eventSequenceNumber, db.events.payload, db.events.payloadType)
            .from(db.events)
            .where(db.events.aggregateIdentifier.eq(aggregateId))
    }

    async getMaxEventSequenceNumberForAggregate(aggregateId: string): Promise<any> {
        const result = await db.select(db.events.eventSequenceNumber)
            .from(db.events)
            .where(db.events.aggregateIdentifier.eq(aggregateId))
            .orderBy(db.events.eventSequenceNumber.desc())
            .limit(1);
        return result[0].eventSequenceNumber
    }

    async save(event: any) {
        const result = await db.insertInto(db.events).values(event)
        // validate success todo
    }
}

const eventRepository = new EventRepository();
export default eventRepository;
