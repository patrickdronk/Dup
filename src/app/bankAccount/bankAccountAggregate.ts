import { Aggregate } from '../../dup/aggregate';
import { CommandHandler, EventHandler } from '../../dup/decorators';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './commands';
import { BankAccountCreatedEvent, DepositEvent, WithdrawalEvent } from './events';

export class BankAccountAggregate extends Aggregate {
  private balance: number = 0;

  constructor() {
    super();
  }

  @CommandHandler
  async handle(command: CreateBankAccountCommand) {
    const event = new BankAccountCreatedEvent(command.aggregateId);
    await this.apply(event);
  }

  @CommandHandler
  async handleWithdrawal(command: WithdrawalCommand) {
    if (this.isBalanceSufficient(command.amount)) {
      await this.apply(new WithdrawalEvent(command.aggregateId, command.amount));
    } else {
      throw new Error('Balance is insufficient');
    }
  }

  @CommandHandler
  async handleDeposit(command: DepositCommand) {
    await this.apply(new DepositEvent(command.aggregateId, command.amount));
  }

  @EventHandler
  async on(_event: BankAccountCreatedEvent) {
    this.balance = 0;
  }

  @EventHandler
  async onDeposit(event: DepositEvent) {
    this.balance += event.amount;
  }

  @EventHandler
  async onWithdrawal(event: WithdrawalEvent) {
    this.balance -= event.amount;
  }

  private isBalanceSufficient(amountToDeduct: number): boolean {
    return this.balance >= amountToDeduct;
  }
}