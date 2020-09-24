import {createEventDefinition, EventBus} from "ts-bus";

export const eventBus = new EventBus();

export const createEvent = createEventDefinition<EventInterface>()("bankAccount.events");

interface EventInterface {
    id: string
}