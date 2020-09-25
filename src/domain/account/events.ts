import {event} from "../../dup/decorators";
import {BaseEvent} from "../../dup/domain/BaseEvent";

@event
export class BankAccountCreatedEvent extends BaseEvent{

    id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }
}

@event
export class MoneyDepositedEvent extends BaseEvent{

    id: string;
    amount: number;

    constructor(id: string, amount:number) {
        super();
        this.id = id;
        this.amount = amount
    }
}
