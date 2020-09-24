import {CommandHandler, EventHandler} from "../../decorators";
import {CreateBankAccountCommand, DepositCommand} from "../../process/commands";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "../../process/events";
import {Aggregate} from "./aggregate";
import {createEvent, createMoneyDepositedEvent, eventbus} from "../../process/eventbus";


export class BankAccount extends Aggregate {

    private bankAccountId?: string;
    private balance = 0;

    @CommandHandler
    handle(command: CreateBankAccountCommand) {
        this.apply(new BankAccountCreatedEvent(command.id));
        eventbus.publish(createEvent(new BankAccountCreatedEvent(command.id)));
    }

    @CommandHandler
    handleDepositCommand(command: DepositCommand) {
        this.apply(new BankAccountCreatedEvent(command.id));
        eventbus.publish(createMoneyDepositedEvent(new MoneyDepositedEvent(command.id,command.amount)));
    }


    @EventHandler
    onBankAccountCreatedEvent(event: BankAccountCreatedEvent) {
        console.log("Processed event in aggregate "+JSON.stringify(event));
        this.bankAccountId = event.id;
    }
    @EventHandler
    onMoneyDepositedEvent(event: MoneyDepositedEvent) {
        console.log("Processed money in aggregate "+JSON.stringify(event));
        this.balance += event.amount;
        console.log('state '+this.balance)
    }

    static create(command: CreateBankAccountCommand) {
        return new BankAccount().handle(command)
    }
}
