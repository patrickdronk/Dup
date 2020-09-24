import eventRepository from "../EventRepository";
import {v4} from 'uuid';
import dayjs = require("dayjs");

export abstract class Aggregate {

    apply(event: any): void {
        eventRepository.save({
            eventidentifier: v4(),
            aggregateidentifier: event.id,
            eventsequencenumber: undefined,
            payload: JSON.stringify(event),
            payload_type: event.constructor.name,
            timestamp: dayjs().toISOString()
        });
    }

}
