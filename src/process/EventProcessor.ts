import {commandBus} from "./commandbus";
import {BankAccount} from "../domain/account/bankaccount";

class EventProcessor {
    unsubscribe: any;

    listen(): void {
        this.unsubscribe = commandBus.subscribe("bankAccount.events", event => {
            console.log(event)
        })
    }

    unlisten(): void {
        this.unsubscribe();
    }
}