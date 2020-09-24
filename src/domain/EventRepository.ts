import {domain_event, PrismaClient} from '@prisma/client'
import {Event} from "./events";
import dayjs, {Dayjs} from "dayjs";
import {uuid} from 'uuidv4';


const prisma = new PrismaClient()

class EventRepository {
    getAllDomainEventsByAggregateId(aggregateId: string) {
        return prisma.domain_event.findMany({
            where: {
                aggregateidentifier: aggregateId
            }
        })
    }

    async save(event: domain_event) {
        // @ts-ignore
        const payload = JSON.stringify(event)
        await prisma.domain_event.create({
            data: event
        });
    }
}

const eventRepository = new EventRepository()
export default eventRepository
