export abstract class AbstractCommand {

}

export class CreateBankAccountCommand extends AbstractCommand{
    id: string;
}

export class DepositCommand extends AbstractCommand{
    //aggregateId
    id: string;
    amount: number;
}
