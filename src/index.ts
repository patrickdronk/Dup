import {CreateBankAccountCommand} from "./domain/commands";
import {CommandHandler, EventHandler} from "./decorators";
import {BankAccountCreatedEvent} from "./domain/events";

abstract class Aggregate {
    apply(event: any): void {
        console.log("log to store")
    }
}

class BankAccount extends Aggregate {
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

const command = new CreateBankAccountCommand("hi")

//commandbus
const bankAccountAggregate = new BankAccount()

bankAccountAggregate.handle(command)
