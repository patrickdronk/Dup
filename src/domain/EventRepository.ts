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

    async getMaxEventSequenceNumberForAggregate(aggregateId: string): Promise<number> {
        const query = `SELECT COALESCE((max(eventsequencenumber)),0) as next
            FROM domain_event
            WHERE aggregateidentifier ='${aggregateId}'`;
        const result = await prisma.$queryRaw<number>(query);
        console.log(result)
        return result[0].next
    }


    async save(event: domain_event) {
        const getMax = await this.getMaxEventSequenceNumberForAggregate(event.aggregateidentifier);
        console.log(getMax)
        try {
            await prisma.domain_event.create({
                data: {
                    ...event,
                    eventsequencenumber: (getMax+1),
                }
            });
        } catch (e) {
            console.log('fout')
            console.error(e.toString())
        }
    }
}

const eventRepository = new EventRepository()
export default eventRepository
