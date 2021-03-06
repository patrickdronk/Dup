import {CommandHandler, EventHandler} from "../../dup/decorators";
import {CreateBankAccountCommand, DepositCommand, WithdrawalCommand} from "./commands";
import {BankAccountCreatedEvent, MoneyDepositedEvent, MoneyWithdrewEvent} from "./events";
import {Aggregate} from "../../dup/aggregate";

export class BankaccountAggregate extends Aggregate {
    private bankAccountId: string | undefined;
    private balance = 0;

    //region commandHandlers
    @CommandHandler
    async handle(command: CreateBankAccountCommand) {
        const event = new BankAccountCreatedEvent(command.aggregateIdentifier);
        await this.apply(event);
    }

    @CommandHandler
    async handleDeposit(command: DepositCommand) {
        const event = new MoneyDepositedEvent(command.aggregateIdentifier, command.amount)
        await this.apply(event);
    }

    @CommandHandler
    async handleWithdrawal(command: WithdrawalCommand) {
        console.log(this.balance)
        if (this.isBalanceSufficient(command.amount)) {
            await this.apply(new MoneyWithdrewEvent(command.aggregateIdentifier, command.amount))
        } else {
            console.error("Jammer joh, niet genoeg monies")
        }
    }

    //endregion

    //region eventHandlers
    @EventHandler
    onBankAccountCreatedEvent(event: BankAccountCreatedEvent) {
        this.bankAccountId = event.id;
    }

    @EventHandler
    onMoneyDepositedEvent(event: MoneyDepositedEvent) {
        this.balance += event.amount;
    }

    @EventHandler
    onMoneyWithdrewEvent(event: MoneyWithdrewEvent) {
        this.balance -= event.amount
    }

    //endregion

    private isBalanceSufficient(amountToDeduct: number): boolean {
        return this.balance >= amountToDeduct
    }
}
