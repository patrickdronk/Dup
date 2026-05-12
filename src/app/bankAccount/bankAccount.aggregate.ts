import { Aggregate } from '../../dup/aggregate';

export class BankAccountAggregate extends Aggregate {
  private balance: number = 0;

  constructor() {
    super();
  }

  @Commandhandler
  public on(command: CreateBankAccountCommand): void {
    this.apply(new BankAccountCreatedEvent());
  }

  private isBalanceSufficient(amountToDeduct: number): boolean {
    return this.balance >= amountToDeduct;
  }
}
