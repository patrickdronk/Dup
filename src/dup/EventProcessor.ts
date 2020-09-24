import {BankaccountAggregate} from "../domain/account/bankaccountAggregate";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "../domain/account/events";
import {Aggregate} from "../domain/account/aggregate";
import {eventbus} from "./eventbus";
import eventRepository from "./EventRepository";
import { AggregateStore } from "../AggregateStore";

export interface Type<T> {
    new(...args: any[]): T;
}

export class EventProcessor {
    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = eventbus.subscribe("BankAccountCreatedEvent", async event => {
            await this.procesEventHistory(event.payload.id)
        });

        // this.unsubscribe2 = eventbus.subscribe("MoneyDepositedEvent", async event => {
        //     await this.procesEventHistory(event.payload.id);
        // });
    }

    unlisten(): void {
        this.unsubscribe();
        // this.unsubscribe2();
    }

    private async procesEventHistory(aggregateId: string): Promise<void> {
        const allDomainEventsByAggregateId = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);
        const build = new AggregateStore[allDomainEventsByAggregateId[0].aggregate_type] as Aggregate;
        build.rebuildState(allDomainEventsByAggregateId)
    }
}
