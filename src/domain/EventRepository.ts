import {PrismaClient} from '@prisma/client'
import {Event} from "./events";
import dayjs, {Dayjs} from "dayjs";

const prisma = new PrismaClient()

class EventRepository {
    getAllDomainEventsByAggregateId(aggregateId: string) {
        prisma.domain_event.findMany({
            where: {
                aggregateidentifier: aggregateId
            }
        })
    }

    getMaxEventSequenceNumberForAggregate(aggregateId: string) {
        const query = `SELECT max(eventsequencenumber) 
                       FROM domain_event
                       WHERE aggregateidentifier = ${aggregateId}`
        return prisma.executeRaw(query)
    }

    async save(event: Event) {
        // @ts-ignore
        const payload = JSON.stringify(event)
        await prisma.domain_event.create({
            data: {
                eventidentifier: 2,
                eventsequencenumber: 2,
                aggregateidentifier: "aggregateidentifier",
                payload: payload,
                payload_type: "payload_type",
                timestamp: dayjs().toISOString()
            }
        })
    }
}

const eventRepository = new EventRepository()
export default eventRepository