export class BankAccountCreatedEvent {
    readonly id: string

    constructor(id: string) {
        this.id = id;
    }
}