import {EventBus} from "ts-bus";
import {CreateBankAccountCommand, CreateBankAccountInterface} from "./commands";
import {createEventDefinition} from "ts-bus";

export class Handler {
    bus = new EventBus();

    process(): void {
        const hoi = createEventDefinition<CreateBankAccountInterface>();

        // this.bus.publish(new CreateBankAccountCommand("hi"))

    }
}