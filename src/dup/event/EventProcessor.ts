import {BankAccountCreatedEvent, MoneyDepositedEvent} from "../../domain/account/events";
import {Aggregate} from "../aggregate";
import {eventbus} from "./eventbus";
import eventRepository from "./EventRepository";
import { AggregateStore } from "../../AggregateStore";

//Todo -> GenericEventProcessor
export class EventProcessor {
}
