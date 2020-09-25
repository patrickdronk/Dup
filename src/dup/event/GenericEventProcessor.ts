import {BaseAggregate} from "../domain/baseAggregate";
import eventRepository from "../EventRepository";

// @ts-ignore
import {domain_event} from '@prisma/client'
import aggregateStore from "../store/AggregateStore";
import eventStore from "../store/EventStore";
import eventBus from "./eventbus";

export class GenericEventProcessor {
    unsubscribes: Function[] = [];

    listen(): void {
        const store = eventStore.getStore();
        console.log(Object.getOwnPropertyNames(store));
        Object.getOwnPropertyNames(store).forEach((eventId: string) => {
            console.log("listen to ", eventId)
            this.unsubscribes.push(eventBus.subscribe(eventId, async (event: any) => {
                await this.processEventHistory(event.payload.id)
            }))
        })

    }

    unlisten(): void {
        this.unsubscribes.forEach(unsubscribe => unsubscribe());
    }

    private async processEventHistory(aggregateId: string): Promise<void> {
        const allDomainEventsByAggregateId: domain_event[] = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);

        allDomainEventsByAggregateId.forEach(event => {
            const store = aggregateStore.getStore();
            const build = new store[event.aggregate_type] as BaseAggregate;
            build.rebuildState(allDomainEventsByAggregateId)
        })
    }
}
