export interface Command {
    id: string
}

export class CreateBankAccountCommand implements Command {
    readonly id: string

    constructor(id: string) {
        this.id = id
    }
}