export interface Event {}

export class BankAccountCreatedEvent implements Event {
    readonly id: string

    constructor(id: string) {
        this.id = id;
    }
}