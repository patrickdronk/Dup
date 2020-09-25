export abstract class AbstractEvent {
}

export class BankAccountCreatedEvent implements AbstractEvent{

    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export class MoneyDepositedEvent implements AbstractEvent{

    id: string;
    amount: number;

    constructor(id: string, amount:number) {
        this.id = id;
        this.amount = amount
    }
}
