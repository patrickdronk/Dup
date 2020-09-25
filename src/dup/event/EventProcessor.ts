import {BankAccountCreatedEvent} from "../../domain/account/events";
import {BaseAggregate} from "../aggregate/baseAggregate";
import {eventbus} from "./eventbus";
import eventRepository from "../EventRepository";
import { AggregateStore } from "../store/AggregateStore";
import {domain_event} from '@prisma/client'

//Todo -> GenericEventProcessor
export class EventProcessor {
    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = eventbus.subscribe("BankAccountCreatedEvent", async event => {
            await this.processEventHistory(event.payload.id)
        });

        // this.unsubscribe2 = eventbus.subscribe("MoneyDepositedEvent", async event => {
        //     await this.procesEventHistory(event.payload.id);
        // });
    }

    unlisten(): void {
        this.unsubscribe();
        // this.unsubscribe2();
    }

    private async processEventHistory(aggregateId: string): Promise<void> {
        const allDomainEventsByAggregateId: domain_event[] = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);

        allDomainEventsByAggregateId.forEach(event => {
            const build = new AggregateStore[allDomainEventsByAggregateId[0].aggregate_type] as BaseAggregate;
            build.rebuildState(allDomainEventsByAggregateId)
        })
    }
}
