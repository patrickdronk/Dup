import {commandbus} from "./commandbus";
import {BankAccount} from "../domain/account/bankaccount";
import {DepositCommand} from "./commands";

export class CommandProcessor {

    unsubscribe: any;
    unsubscribe2: any;

    listen(): void {
        this.unsubscribe = commandbus.subscribe("CreateBankAccountCommand", event => {
            console.log("Processing command account created: "+JSON.stringify(event.payload));
            //store bankAccount in DB
            const bankAccount = new BankAccount().handle(event.payload);
        })
        this.unsubscribe2 = commandbus.subscribe("DepositCommand", event => {
            console.log("Processing command deposit: "+JSON.stringify(event.payload));
            //store bankAccount in DB
            const bankAccount = new BankAccount().handleDepositCommand(event.payload);
        })
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }
}
