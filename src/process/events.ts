export abstract class AbstractEvent {
}

export class BankAccountCreatedEvent implements AbstractEvent{

    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
