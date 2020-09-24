import {commandBus} from "./commandBus";
import {BankAccount} from "../domain/account/bankaccount";

export class CommandProcessor {

    unsubscribe: any;

    listen(): void {
        this.unsubscribe = commandBus.subscribe("bankAccount.created", event => {
            console.log(event.payload.id);
            console.log(event.payload);
            const bankAccount = BankAccount.create(event.payload)
            //store bankAccount in DB
        })
    }

    unlisten(): void {
        this.unsubscribe();
    }
}
