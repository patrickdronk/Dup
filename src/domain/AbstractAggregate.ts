import eventRepository from "./EventRepository";
import {Event} from "./events";

export abstract class Aggregate {
    apply(event: Event): void {
        eventRepository.save(event)
    }
}