import {BankAccount} from "../domain/account/bankaccount";
import {AbstractEvent, BankAccountCreatedEvent, MoneyDepositedEvent} from "./events";
import {Aggregate} from "../domain/account/aggregate";
import {eventbus} from "./eventbus";

export class EventProcessor {
    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = eventbus.subscribe("BankAccountCreatedEvent", event => {
            console.log("Processed event in bankaccount: "+JSON.stringify(event));

            const aggregate = new BankAccount();
            // this.processEvents(aggregate, this.getAllEvents());
            aggregate.onBankAccountCreatedEvent(event.payload);
        });

        this.unsubscribe2 = eventbus.subscribe("MoneyDepositedEvent", event => {
            console.log("Processed event in money: "+JSON.stringify(event));

            const aggregate = new BankAccount();
            // this.processEvents(aggregate, this.getAllEvents());
            aggregate.onMoneyDepositedEvent(event.payload);
        });
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }

    private getAllEvents():AbstractEvent[] {
        //REPO to fetch domainEvents here
        return [new BankAccountCreatedEvent("1")];
    }


    private processEvents(aggregate: Aggregate, allEvents: AbstractEvent[]) {
        // allEvents.forEach(event=>{
        //     aggregate.apply(event);
        // });
    }
}
