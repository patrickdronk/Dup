import { v4 } from 'uuid';
import eventRepository from "./event/EventRepository";
import dayjs = require("dayjs");

export abstract class Aggregate {
  async apply(event: any): Promise<void> {
    await eventRepository.save({
      eventIdentifier: v4(),
      aggregateIdentifier: event.id,
      eventSequenceNumber: 1, // fixme
      payload: JSON.stringify(event),
      payloadType: event.constructor.name,
      timestamp: dayjs().toISOString(),
    });
  }

  rebuildState(events: any): void {
    // create a map from eventType to methodName
    const map = Reflect.getMetadataKeys(this)
      .filter((key) => key.startsWith('EventHandler'))
      .map((key) => {
        const methodName = Reflect.getMetadata(key, this);
        return { [key]: methodName };
      })
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        // @ts-ignore
        result[key.replace('EventHandler:', '')] = item[key];
        return result;
      }, {});

    events.forEach((event: any) => {
      const methodName = map[event.payloadType];
      // @ts-ignore
      this[methodName](JSON.parse(event.payload));
    });
  }
}
