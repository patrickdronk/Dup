import eventRepository from "./event/EventRepository";
import {v4} from 'uuid';
import dayjs = require("dayjs");
import {domain_event} from "@prisma/client";

export abstract class Aggregate {
    async apply(event: any): Promise<void> {
        await eventRepository.save({
            eventidentifier: v4(),
            aggregateidentifier: event.id,
            aggregate_type: "BankaccountAggregate",
            eventsequencenumber: 1, // fixme
            payload: JSON.stringify(event),
            payload_type: event.constructor.name,
            timestamp: dayjs().toISOString()
        });
    }

    rebuildState(events: domain_event[]): void {
        // create a map from eventType to methodName
        const map = Reflect.getMetadataKeys(this)
            .filter(key => key.startsWith("EventHandler"))
            .map(key => {
                const methodName = Reflect.getMetadata(key, this)
                return {[key]: methodName}
            })
            .reduce((result, item) => {
                const key = Object.keys(item)[0];
                // @ts-ignore
                result[key.replace("EventHandler:", "")] = item[key];
                return result;
            }, {});

        events.forEach(event => {
            // @ts-ignore
            const methodName = map[event.payload_type]
            //@ts-ignore
            this[methodName](JSON.parse(event.payload))
        })
    }
}
