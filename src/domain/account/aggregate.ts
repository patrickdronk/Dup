import {createEvent, eventbus} from "../../process/eventbus";

export abstract class Aggregate {
    apply(event: any): void {
        console.log("log to store event: ", event);
    }
}
