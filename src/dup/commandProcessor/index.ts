import {AggregateStore} from "../../app/aggregateStore";
import "reflect-metadata"
import {ICommandBus} from "../bus/command-bus";
import {ICommand} from "../command/command";
import {Aggregate} from "../aggregate";
import {getAllDomainEventsByAggregateId} from "../eventRepository";

export class CommandProcessor {
    constructor(commandBus: ICommandBus) {
        Object.getOwnPropertyNames(AggregateStore)
            .forEach((aggregateKey: string) => {
                const aggregate = new AggregateStore[aggregateKey]

                const commandHandlers = Reflect.getMetadataKeys(aggregate)
                    .filter((metaDataKeys: string) => {
                        return metaDataKeys.startsWith("CommandHandler:")
                    })

                commandHandlers.forEach((commandKey) => {
                    const commandType = commandKey.replace("CommandHandler:", "")
                    commandBus.register(commandType, async (command: ICommand) => {
                        const rebuildAggregate = await CommandProcessor.rebuildAggregate(command.aggregateId, aggregate);
                        const methodName = Reflect.getMetadata(commandKey, aggregate)

                        //@ts-ignore
                        rebuildAggregate[`${methodName}`](command);
                    })
                })
            })
    }

    private static async rebuildAggregate(aggregateId: string, aggregate: Aggregate): Promise<Aggregate> {
        const allDomainEventsByAggregateId = await getAllDomainEventsByAggregateId(aggregateId);
        aggregate.rebuildState(allDomainEventsByAggregateId)
        return aggregate
    }
}