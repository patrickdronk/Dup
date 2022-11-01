import {IEvent} from "../../dup/event/event";

export class BankAccountCreatedEvent implements IEvent {
    constructor(readonly aggregateId: string) {
    }
}

export class WithdrawalEvent implements IEvent {
    constructor(readonly aggregateId: string, readonly amount: number) {
    }
}

export class DepositEvent implements IEvent {
    constructor(readonly aggregateId: string, readonly amount: number) {
    }
}