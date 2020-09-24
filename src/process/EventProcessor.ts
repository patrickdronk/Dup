import {BankAccount} from "../domain/account/bankaccount";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "./events";
import {Aggregate} from "../domain/account/aggregate";
import {eventbus} from "./eventbus";
import eventRepository from "../domain/EventRepository";

export class EventProcessor {
    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = eventbus.subscribe("BankAccountCreatedEvent", event => {
            console.log("Processed event in bankaccount: " + JSON.stringify(event));

            const aggregate = new BankAccount();
            // this.processEvents(aggregate, this.getAllEvents());
            aggregate.onBankAccountCreatedEvent(event.payload);
        });

        this.unsubscribe2 = eventbus.subscribe("MoneyDepositedEvent", async event => {
            console.log("Processed event in money: " + JSON.stringify(event));

            const aggregate = new BankAccount();
            await this.getAllEvents(aggregate, event.payload.id);
            aggregate.onMoneyDepositedEvent(event.payload);
        });
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }

    private async getAllEvents(aggregate: Aggregate, aggregateId: string): Promise<void> {
        //REPO to fetch domainEvents here
        const allDomainEventsByAggregateId = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);
        allDomainEventsByAggregateId.forEach((event: any) => {
            // console.log(event.payload_type);
            // JSON.parse(event.payload);
            // const temp = Reflect.getMetadata("eventhandler", event.payload)


            // if(aggregate[event.payload_type]){
            //     aggregate[event.payload_type](event.payload_type)
            // }

        })
    }
}
