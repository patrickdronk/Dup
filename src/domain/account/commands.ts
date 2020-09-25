import {command} from "../../dup/decorators";

export abstract class AbstractCommand {}

@command
export class CreateBankAccountCommand extends AbstractCommand{
    id: string;
}

@command
export class DepositCommand extends AbstractCommand{
    //aggregateId
    id: string;
    amount: number;
}
