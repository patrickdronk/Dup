export class CreateBankAccountCommand {
    readonly id: string

    constructor(id: string) {
        this.id = id
    }
}

export interface CreateBankAccountInterface {
    id: string
}

export class DepositCommand {

}