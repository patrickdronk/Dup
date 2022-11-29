import { Aggregate } from '../../dup/aggregate';

export class BankAccountAggregate extends Aggregate {
  private balance: number = 0;

  constructor() {
    super();
  }

  private isBalanceSufficient(amountToDeduct: number): boolean {
    return this.balance >= amountToDeduct;
  }
}
