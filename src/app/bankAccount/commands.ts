import {ICommand} from "../../dup/command/command";

export class CreateBankAccountCommand implements ICommand {
    constructor(readonly aggregateId: string) {
    }
}

export class WithdrawalCommand implements ICommand {
    constructor(readonly aggregateId: string, readonly amount: number) {
    }
}

export class DepositCommand implements ICommand {
    constructor(readonly aggregateId: string, readonly amount: number) {
    }
}