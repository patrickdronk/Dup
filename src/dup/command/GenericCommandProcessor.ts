import {BaseAggregate} from "../domain/baseAggregate";
import eventRepository from "../EventRepository";

// @ts-ignore
import {domain_event} from '@prisma/client'
import aggregateStore from "../store/AggregateStore";
import eventStore from "../store/EventStore";
import eventBus from "../event/EventBus";
import commandStore from "../store/CommandStore";
import {BankAccountAggregate} from "../../domain/account/bankAccountAggregate";

export class GenericCommandProcessor {
    unsubscribes: Function[] = [];

    listen(): void {
        const store = commandStore.getStore();
        console.log(Object.getOwnPropertyNames(store));
        Object.getOwnPropertyNames(store).forEach((commandId: string) => {
            console.log("listen to ", commandId)
            this.unsubscribes.push(eventBus.subscribe(commandId, async (event: any) => {
                const bankAccountAggregate = new BankAccountAggregate();
                //TODO add the necessary reflection here
                bankAccountAggregate[`handle${commandId}`]()
            }))
        })

    }

    unlisten(): void {
        this.unsubscribes.forEach(unsubscribe => unsubscribe());
    }
}
