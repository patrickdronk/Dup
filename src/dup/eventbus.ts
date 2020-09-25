import {createEventDefinition, EventBus} from "ts-bus";
import {BankAccountCreatedEvent, MoneyDepositedEvent} from "../domain/account/events";

export const eventbus = new EventBus();

export const createEvent = createEventDefinition<BankAccountCreatedEvent>()("BankAccountCreatedEvent");
export const createMoneyDepositedEvent = createEventDefinition<MoneyDepositedEvent>()("MoneyDepositedEvent");
