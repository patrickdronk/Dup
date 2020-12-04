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

    getMaxEventSequenceNumberForAggregate(aggregateId: string): any {
        //ToDo
    }

    async save(event: any) {
        const result = await db.insertInto(db.events).values(event)
        // validate success todo
    }
}

const eventRepository = new EventRepository();
export default eventRepository;
