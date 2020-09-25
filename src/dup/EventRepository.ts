import {domain_event, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class EventRepository {
    getAllDomainEventsByAggregateId(aggregateId: string) {
        return prisma.domain_event.findMany({
            where: {
                aggregateidentifier: aggregateId
            }
        })
    }

    getMaxEventSequenceNumberForAggregate(aggregateId: string): Promise<number> {
        const query = `SELECT 0+max(eventsequencenumber)+1
                        FROM domain_event
                        WHERE aggregateidentifier = '${aggregateId}'`;
        return prisma.$executeRaw(query)
    }

    async save(event: domain_event) {
        try {
            // await prisma.domain_event.create({
            //     data: {
            //         ...event,
            //         eventsequencenumber: await this.getMaxEventSequenceNumberForAggregate(event.aggregateidentifier),
            //     }
            // });
        } catch (e) {
            console.log(e.toString())
        }
    }
}

const eventRepository = new EventRepository()
export default eventRepository
