import {commandBus} from "./commandbus";
import {BankAccount} from "../domain/account/bankaccount";
import {AbstractEvent, BankAccountCreatedEvent} from "./events";
import {Aggregate} from "../domain/account/aggregate";
import {eventBus} from "./eventbus";

export class EventProcessor {
    unsubscribe: any;

    listen(): void {
        this.unsubscribe = eventBus.subscribe("bankAccount.events", event => {
            console.log("Processed event: "+JSON.stringify(event));

            const aggregate = new BankAccount();
            // this.processEvents(aggregate, this.getAllEvents());
            const bankAccountEvent:BankAccountCreatedEvent  = event.payload;
            aggregate.on(bankAccountEvent);
        })
    }

    private getAllEvents():AbstractEvent[] {
        //REPO to fetch domainEvents here
        return [new BankAccountCreatedEvent("1")];
    }



    unlisten(): void {
        this.unsubscribe();
    }

    private processEvents(aggregate: Aggregate, allEvents: AbstractEvent[]) {
        // allEvents.forEach(event=>{
        //     aggregate.apply(event);
        // });
    }
}
