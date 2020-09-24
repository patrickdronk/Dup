import {createEventDefinition, EventBus} from "ts-bus";

export const commandBus = new EventBus();

export const createBankAccountCommand = createEventDefinition<CreateBankAccountInterface>()("bankAccount.created");

interface CreateBankAccountInterface {
    id: string
}