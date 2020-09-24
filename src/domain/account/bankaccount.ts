import {CommandHandler, EventHandler} from "../../decorators";
import {CreateBankAccountCommand,AbstractCommand} from "../../process/commands";
import {BankAccountCreatedEvent} from "../../process/events";
import {Aggregate} from "./aggregate";



export class BankAccount extends Aggregate {
    private bankAccountId?: string;

    @CommandHandler
    handle(command: CreateBankAccountCommand) {
        this.apply(new BankAccountCreatedEvent(command.id))
    }

    @EventHandler
    on(event: BankAccountCreatedEvent) {
        this.bankAccountId = event.id
    }

    static create(command: CreateBankAccountCommand) {
        return new BankAccount().handle(command)
    }
}