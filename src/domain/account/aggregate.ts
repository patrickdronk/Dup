import eventRepository from "../../dup/EventRepository";
import {v4} from 'uuid';
import dayjs = require("dayjs");

export abstract class Aggregate {
    apply(event: any): void {
        eventRepository.save({
            eventidentifier: v4(),
            aggregateidentifier: event.id,
            aggregate_type: "BankaccountAggregate",
            eventsequencenumber: undefined,
            payload: JSON.stringify(event),
            payload_type: event.constructor.name,
            timestamp: dayjs().toISOString()
        });
    }

    rebuildState(events: any): void {
        console.log(events)
        const reflection = Reflect.getMetadata("onBankAccountCreatedEvent", this)

        // @ts-ignore
        this['onBankAccountCreatedEvent'](events[0].payload)
    }
}
