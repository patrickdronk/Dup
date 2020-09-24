import {CommandHandler, EventHandler} from "../decorators";
import {CreateBankAccountCommand} from "./commands";
import {BankAccountCreatedEvent} from "./events";
import {Aggregate} from "./AbstractAggregate";

export class BankAccountAggregate extends Aggregate {
    private bankAccountId?: string

    @CommandHandler
    handle(command: CreateBankAccountCommand) {
        this.apply(new BankAccountCreatedEvent(command.id))
    }

    @EventHandler
    on(event: BankAccountCreatedEvent) {
        this.bankAccountId = event.id
    }
}