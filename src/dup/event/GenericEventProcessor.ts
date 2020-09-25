import {BankAccountCreatedEvent} from "../../domain/account/events";
import {BaseAggregate} from "../aggregate/baseAggregate";
import {eventbus} from "./eventbus";
import eventRepository from "../EventRepository";

// @ts-ignore
import {domain_event} from '@prisma/client'
import aggregateStore from "../store/AggregateStore";

export class GenericEventProcessor {
    unsubscribe: any;

    listen(): void {
        this.unsubscribe = eventbus.subscribe("BankAccountCreatedEvent", async event => {
            await this.processEventHistory(event.payload.id)
        });
    }

    unlisten(): void {
        this.unsubscribe();
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
