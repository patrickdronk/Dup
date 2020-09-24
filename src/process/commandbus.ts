import {createEventDefinition, EventBus} from "ts-bus";
import {CreateBankAccountCommand, DepositCommand} from "./commands";

export const commandbus = new EventBus();

// TBD  generate this boilerplate based on decorators
export const createBankAccountCommand = createEventDefinition<CreateBankAccountCommand>()("CreateBankAccountCommand");
export const depositMoneyCommand = createEventDefinition<DepositCommand>()("DepositCommand");
