import {aggregate, CommandHandler, EventHandler} from "../../dup/decorators";
import {CreateBankAccountCommand, DepositCommand} from "./commands";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "./events";
import {BaseAggregate} from "../../dup/domain/baseAggregate";
import eventBus from "../../dup/event/EventBus";

@aggregate
export class BankAccountAggregate extends BaseAggregate {
    private bankAccountId: string | null = null;
    private balance = 0;

    @CommandHandler
    handle(command: CreateBankAccountCommand) {
        this.apply(new BankAccountCreatedEvent(command.id));
        eventBus.publish(new BankAccountCreatedEvent(command.id));
    }

    @CommandHandler
    handleDepositCommand(command: DepositCommand) {
        this.apply(new MoneyDepositedEvent(command.id, command.amount));
        eventBus.publish(new MoneyDepositedEvent(command.id, command.amount));
    }


    @EventHandler()
    onBankAccountCreatedEvent(event: BankAccountCreatedEvent) {
        this.bankAccountId = event.id;
    }

    // @EventHandler()
    // onMoneyDepositedEvent(event: MoneyDepositedEvent) {
    //     this.balance += event.amount;
    // }
}
