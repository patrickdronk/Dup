import {createEventDefinition, EventBus as InternalEventBus} from "ts-bus";
import {ICommand} from "./command";

class CommandBus {
    private internalCommandBus: InternalEventBus;

    constructor() {
        this.internalCommandBus = new InternalEventBus();
    }

    publish(event: ICommand) {
        console.log("here :)");
        console.log(event);
        this.internalCommandBus.publish(createEventDefinition<typeof event>()(event.constructor.name)(event))
    }

    subscribe(eventId: string, callBack: (event: any) => Promise<void>): Function {
        return this.internalCommandBus.subscribe(eventId, callBack);
    }
}

const commandBus = new CommandBus()
export default commandBus;
