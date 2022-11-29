import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { DomainEvent, IEvent } from './event/event';
import { save } from './eventRepository';

const eventBridgeClient = new EventBridgeClient({});

export abstract class Aggregate {
  async apply(event: IEvent): Promise<void> {
    try {


      await save({
        eventId: v4(),
        aggregateId: event.aggregateId,
        aggregateType: 'BankaccountAggregate', //fixMe
        eventSequenceNumber: 1, //fixMe
        payload: JSON.stringify(event),
        payloadType: event.constructor.name,
        timestamp: dayjs().toISOString(),
      });

      await eventBridgeClient.send(new PutEventsCommand({
        Entries: [{
          Source: 'BankAccountAggregate',
          EventBusName: 'dup-event-bus',
          DetailType: 'BankAccountCreatedEvent',
          Detail: JSON.stringify(event),
        }],
      }));
    } catch (e) {
      console.log(e);
    }
  }

  rebuildState(events: DomainEvent[]): void {
    // create a map from eventType to methodName
    const map = Reflect.getMetadataKeys(this)
      .filter(key => key.startsWith('EventHandler'))
      .map(key => {
        const methodName = Reflect.getMetadata(key, this);
        return { [key]: methodName };
      })
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        // @ts-ignore
        result[key.replace('EventHandler:', '')] = item[key];
        return result;
      }, {});

    events.forEach(event => {
      // @ts-ignore
      const methodName = map[event.payloadType];
      //@ts-ignore
      this[methodName](JSON.parse(event.payload));
    });
  }
}