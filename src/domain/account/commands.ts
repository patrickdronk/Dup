import {Command} from "../../dup/command";

export class CreateBankAccountCommand implements Command {
    aggregateIdentifier: string;

    constructor(aggregateIdentifier: string) {
        this.aggregateIdentifier = aggregateIdentifier;
    }
}

export class DepositCommand implements Command {
    aggregateIdentifier: string;
    amount: number;

    constructor(aggregateIdentifier: string, amount: number) {
        this.aggregateIdentifier = aggregateIdentifier;
        this.amount = amount;
    }
}

export class WithdrawalCommand implements Command {
    aggregateIdentifier: string;
    amount: number

    constructor(aggregateIdentifier: string, amount: number) {
        this.aggregateIdentifier = aggregateIdentifier;
        this.amount = amount;
    }
}
