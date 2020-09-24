import {createEventDefinition, EventBus} from "ts-bus";
import {AbstractEvent} from "./events";

export const eventBus = new EventBus();

export const createEvent = createEventDefinition<AbstractEvent>()("bankAccount.events");

interface EventInterface {
    id: string
}
