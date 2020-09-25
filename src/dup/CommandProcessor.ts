import {commandbus} from "./commandbus";
import {BankaccountAggregate} from "../domain/account/bankaccountAggregate";
import {DepositCommand} from "../domain/account/commands";
import {Command} from "./command";
import eventRepository from "./EventRepository";
import {AggregateStore} from "../AggregateStore";
import {Aggregate} from "./aggregate";

export class CommandProcessor {
    unsubscribe: any;
    unsubscribe2: any;
    unsubscribe3: any;

    listen(): void {
        this.unsubscribe = commandbus.subscribe("CreateBankAccountCommand", event => {
            new BankaccountAggregate().handle(event.payload);
        })

        this.unsubscribe2 = commandbus.subscribe("DepositCommand", async event => {
            const command: Command = event.payload
            let aggregate = await this.rebuildAggregate(command.aggregateIdentifier);
            // @ts-ignore
            aggregate['handleDeposit'](command);
        })

        this.unsubscribe3 = commandbus.subscribe("WithdrawalCommand", async event => {
            const command: Command = event.payload
            let aggregate = await this.rebuildAggregate(command.aggregateIdentifier)
            // @ts-ignore
            aggregate['handleWithdrawal'](command)
        })
    }

    unlisten(): void {
        this.unsubscribe();
        this.unsubscribe2();
    }

    private async rebuildAggregate(aggregateId: string): Promise<Aggregate> {
        const allDomainEventsByAggregateId = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);
        const build = new AggregateStore[allDomainEventsByAggregateId[0].aggregate_type] as Aggregate;
        build.rebuildState(allDomainEventsByAggregateId)
        return build
    }
}
