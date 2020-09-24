import {createEvent, eventbus} from "../../process/eventbus";
import eventRepository from "../EventRepository";
import {uuid} from "uuidv4";
import dayjs = require("dayjs");

export abstract class Aggregate {

    apply(event: any): void {
        console.log("log to store event: ", event);
        eventRepository.save({
            eventidentifier: 5,
            aggregateidentifier: event.id,
            eventsequencenumber: 2,  //TODO
            payload: JSON.stringify(event),
            payload_type: event.constructor.name,
            timestamp: dayjs().toISOString()
        });
    }
}
