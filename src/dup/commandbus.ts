import {createEventDefinition, EventBus} from "ts-bus";
import {CreateBankAccountCommand, DepositCommand, WithdrawalCommand} from "../domain/account/commands";
import {createEvent} from "./eventbus";

export const commandbus = new EventBus();

// TBD  generate this boilerplate based on decorators
export const createBankAccountCommand = createEventDefinition<CreateBankAccountCommand>()("CreateBankAccountCommand");
export const depositCommand = createEventDefinition<DepositCommand>()("DepositCommand");
export const withdrawalCommand = createEventDefinition<WithdrawalCommand>()("WithdrawalCommand")
