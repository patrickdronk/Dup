import {createEventDefinition, EventBus as InternalEventBus} from "ts-bus";
import {Event} from "../event/event";
import {ICommand} from "./command";

class CommandBus {
    private internalEventBus: InternalEventBus;

    constructor() {
        this.internalEventBus = new InternalEventBus();
    }

    publish(event: ICommand) {
        this.internalEventBus.publish(createEventDefinition<typeof event>()(event.constructor.name)(event))
    }

    subscribe(eventId: string, callBack: (event: any) => Promise<void>): Function {
        return this.internalEventBus.subscribe(eventId, callBack);
    }
}

const commandBus = new CommandBus()
export default commandBus;
