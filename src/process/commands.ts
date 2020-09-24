export abstract class AbstractCommand {

}

export class CreateBankAccountCommand extends AbstractCommand{
    readonly id: string;

    constructor(id: string) {
        super();
        this.id = id
    }
}

// export class DepositCommand {
//     readonly id: string;
//     amount: number;
//
//     constructor(id: string, amount: number) {
//         this.id = id;
//         this.amount = amount;
//     }
// }