import {commandbus} from "./commandbus";
import {BankaccountAggregate} from "../domain/account/bankaccountAggregate";
import {DepositCommand} from "../domain/account/commands";

export class CommandProcessor {

    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = commandbus.subscribe("CreateBankAccountCommand", event => {
            const bankAccount = new BankaccountAggregate().handle(event.payload);
        })
        this.unsubscribe2 = commandbus.subscribe("DepositCommand", event => {
            const bankAccount = new BankaccountAggregate().handleDepositCommand(event.payload);
        })
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }
}
