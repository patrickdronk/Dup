import {save} from "./eventRepository";
import {DomainEvent, IEvent} from "./event/event";
import dayjs from "dayjs";
import {uuid} from "uuidv4";

export abstract class Aggregate {
    async apply(event: IEvent): Promise<void> {
        await save({
            eventIdentifier: uuid(),
            aggregateIdentifier: event.aggregateId,
            aggregateType: "BankaccountAggregate",//fixMe
            eventSequenceNumber: 1, //fixMe
            payload: JSON.stringify(event),
            payloadType: event.constructor.name,
            timestamp: dayjs().toISOString()
        });
    }

    rebuildState(events: DomainEvent[]): void {
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
            const methodName = map[event.payloadType]
            //@ts-ignore
            this[methodName](JSON.parse(event.payload))
        })
    }
}