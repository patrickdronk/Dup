import {BankAccount} from "../domain/account/bankaccount";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "../domain/account/events";
import {Aggregate} from "../domain/account/aggregate";
import {eventbus} from "./eventbus";
import eventRepository from "../domain/EventRepository";

export class EventProcessor {
    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = eventbus.subscribe("BankAccountCreatedEvent", event => {
            const aggregate = new BankAccount();
            aggregate.onBankAccountCreatedEvent(event.payload);
        });

        this.unsubscribe2 = eventbus.subscribe("MoneyDepositedEvent", async event => {
            const aggregate = new BankAccount();
            await this.procesEventHistory(aggregate, event.payload.id);
            aggregate.onMoneyDepositedEvent(event.payload);
        });
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }

    private async procesEventHistory(aggregate: Aggregate, aggregateId: string): Promise<void> {
        //REPO to fetch domainEvents here
        const allDomainEventsByAggregateId = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);
        allDomainEventsByAggregateId.forEach((event: any) => {
            // console.log(event.payload_type);
            // JSON.parse(event.payload);
            try {

                console.log('lookup')
                const temp = Reflect.getMetadata("eventhandler",aggregate);
                // const temp = Reflect.getMetadata("eventhandler", "on"+event.payload_type);
                // temp(event.payload)
                console.log('class'+temp)

            }catch (e) {
                console.log(e.toString())
            }



            // if(aggregate[event.payload_type]){
            //     aggregate[event.payload_type](event.payload_type)
            // }


        })
    }
}
