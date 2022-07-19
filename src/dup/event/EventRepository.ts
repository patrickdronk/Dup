import {domain_event, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class EventRepository {
    async getAllEvents(): Promise<domain_event[]> {
        return await prisma.domain_event.findMany({})
    }
    getAllDomainEventsByAggregateId(aggregateId: string) {
        return prisma.domain_event.findMany({
            where: {
                aggregateidentifier: aggregateId
            }
        })
    }

    getMaxEventSequenceNumberForAggregate(aggregateId: string): Promise<number> {
        console.log(aggregateId)
        return prisma.$executeRaw`
            SELECT 0 + max(eventsequencenumber) + 1
            FROM domain_event
            WHERE aggregateidentifier = ${aggregateId}
        `
    }

    async save(event: domain_event) {
        try {
            await prisma.domain_event.create({
                data: {
                    ...event,
                    eventsequencenumber: await this.getMaxEventSequenceNumberForAggregate(event.aggregateidentifier),
                }
            });
        } catch (e) {
            console.log(e)
        }
    }
}

const eventRepository = new EventRepository()
export default eventRepository
