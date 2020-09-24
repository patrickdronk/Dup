import {CommandHandler, EventHandler} from "../../dup/decorators";
import {CreateBankAccountCommand, DepositCommand} from "./commands";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "./events";
import {Aggregate} from "./aggregate";
import {createEvent, createMoneyDepositedEvent, eventbus} from "../../dup/eventbus";


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
        this.apply(new MoneyDepositedEvent(command.id, command.amount));
        eventbus.publish(createMoneyDepositedEvent(new MoneyDepositedEvent(command.id, command.amount)));
    }


    @EventHandler
    onBankAccountCreatedEvent(event: BankAccountCreatedEvent) {
        this.bankAccountId = event.id;
    }

    @EventHandler
    onMoneyDepositedEvent(event: MoneyDepositedEvent) {
        this.balance += event.amount;
    }

    static create(command: CreateBankAccountCommand) {
        return new BankAccount().handle(command)
    }
}
