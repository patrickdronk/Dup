import { EventBridgeEvent } from 'aws-lambda';
import { BankAccountCreatedEvent, DepositEvent } from '../events';

export class EmailProcessor {
  async handleCreatedEvent(event: BankAccountCreatedEvent) {
    console.log(`Sending email to ${event.aggregateId}`);
  }

  async handleDepositEvent(_event: DepositEvent) {
    console.log('Sending mail about deposit');
  }
}

const processor = new EmailProcessor();

export const handler = async (handlerEvent: EventBridgeEvent<any, any>) => {
  switch (handlerEvent['detail-type']) {
    case 'BankAccountCreatedEvent': {
      await processor.handleCreatedEvent(handlerEvent.detail);
    }
      break;
    case DepositEvent.toString(): {
      await processor.handleDepositEvent(handlerEvent.detail);
    }
  }
};