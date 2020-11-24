import eventRepository from '../event/EventRepository';
import { Aggregate } from '../aggregate';
import commandBus from './commandbus';
import { ICommand } from './command';
import aggregateStore from '../../AggregateStore';

export class CommandProcessor {
  listen(): void {
    Object.getOwnPropertyNames(aggregateStore)
      .forEach((aggregateKey: string) => {
        const aggregate = new aggregateStore[aggregateKey]();
        const commands = Reflect.getMetadataKeys(aggregate)
          .filter((metaDataKeys: string) => metaDataKeys.startsWith('CommandHandler:'));

        commands.forEach((commandKey) => {
          commandBus.subscribe(commandKey.replace('CommandHandler:', ''), async (event: any) => {
            const command: ICommand = event.payload;
            const rebuildAggregate = await CommandProcessor.rebuildAggregate(command.aggregateIdentifier, aggregate);
            const methodName = Reflect.getMetadata(commandKey, aggregate);

            // @ts-ignore
            rebuildAggregate[`${methodName}`](command);
          });
        });
      });
  }

  private static async rebuildAggregate(aggregateId: string, aggregate: Aggregate): Promise<Aggregate> {
    const allDomainEventsByAggregateId = await eventRepository.getAllDomainEventsByAggregateId(aggregateId);
    aggregate.rebuildState(allDomainEventsByAggregateId);
    return aggregate;
  }
}
