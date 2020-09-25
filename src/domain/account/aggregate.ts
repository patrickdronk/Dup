import eventRepository from "../../dup/EventRepository";
import {v4} from 'uuid';
import dayjs = require("dayjs");
import { domain_event } from "@prisma/client";

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

    rebuildState(events: domain_event[]): void {
        events.forEach(event => {
            //ToDo find by argumentType
            const reflection = Reflect.getMetadata(`on${event.payload_type}`, this)
            // @ts-ignore
            this[reflection](event.payload)
        })
    }
}
