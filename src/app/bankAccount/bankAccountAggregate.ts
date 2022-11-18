import { Aggregate } from '../../dup/aggregate';
import { CommandHandler, EventHandler } from '../../dup/decorators';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './commands';
import { BankAccountCreatedEvent, DepositEvent, WithdrawalEvent } from './events';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

export class BankAccountAggregate extends Aggregate {
  private balance: number = 0;
  private eventBridge: EventBridgeClient;

  constructor() {
    super();
    this.eventBridge = new EventBridgeClient({region: "eu-west-1"})
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
    const command = new PutEventsCommand({
      Entries: [
        {
          Detail: _event.aggregateId,
          DetailType: "BankAccountCreatedEvent"
        }
      ]
    })

    await this.eventBridge.send(command)
    this.balance = 0;
  }

  @EventHandler
  async onDeposit(event: DepositEvent) {
    const command = new PutEventsCommand({
      Entries: [
        {
          Detail: event.aggregateId,
          DetailType: "DepositEvent"
        }
      ]
    })

    await this.eventBridge.send(command)
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