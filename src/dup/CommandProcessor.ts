import {commandbus} from "./commandbus";
import {BankAccount} from "../domain/account/bankaccount";
import {DepositCommand} from "../domain/account/commands";

export class CommandProcessor {

    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = commandbus.subscribe("CreateBankAccountCommand", event => {
            const bankAccount = new BankAccount().handle(event.payload);
        })
        this.unsubscribe2 = commandbus.subscribe("DepositCommand", event => {
            const bankAccount = new BankAccount().handleDepositCommand(event.payload);
        })
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }
}
