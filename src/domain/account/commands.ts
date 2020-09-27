import {ICommand} from "../../dup/command/command";

export class CreateBankAccountCommand implements ICommand {
    constructor(public aggregateIdentifier: string) {
        this.aggregateIdentifier = aggregateIdentifier;
    }
}

export class DepositCommand implements ICommand {
    aggregateIdentifier: string;
    amount: number;

    constructor(aggregateIdentifier: string, amount: number) {
        this.aggregateIdentifier = aggregateIdentifier;
        this.amount = amount;
    }
}

export class WithdrawalCommand implements ICommand {
    aggregateIdentifier: string;
    amount: number

    constructor(aggregateIdentifier: string, amount: number) {
        this.aggregateIdentifier = aggregateIdentifier;
        this.amount = amount;
    }
}
