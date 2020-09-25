import {createEventDefinition, EventBus as InternalEventBus} from "ts-bus";
import {BaseEvent} from "../domain/BaseEvent";

class EventBus {
    private internalEventBus: InternalEventBus;

    constructor() {
        this.internalEventBus = new InternalEventBus();
    }

    publish(event: BaseEvent) {
        this.internalEventBus.publish(createEventDefinition<typeof event>()(event.constructor.name)(event))
    }

    subscribe(eventId: string, callBack: (event: any) => Promise<void>): Function {
        return this.internalEventBus.subscribe(eventId, callBack);
    }
}

const eventBus = new EventBus()
export default eventBus;
