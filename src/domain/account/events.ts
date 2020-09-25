import {Event} from "../../dup/event";

export class BankAccountCreatedEvent implements Event {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export class MoneyDepositedEvent implements Event {
    id: string;
    amount: number;

    constructor(id: string, amount: number) {
        this.id = id;
        this.amount = amount
    }
}

export class MoneyWithdrewEvent implements Event {
    id: string;
    amount: number;

    constructor(id: string, amount: number) {
        this.id = id;
        this.amount = amount;
    }
}