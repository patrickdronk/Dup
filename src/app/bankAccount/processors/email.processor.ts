import { BankAccountCreatedEvent, DepositEvent } from '../events';
import { EventBridgeEvent } from "aws-lambda"

export class EmailProcessor {
  async handleCreatedEvent(event: BankAccountCreatedEvent) {
    console.log(`Sending email to ${event.aggregateId}`);
  }

  handleDepositEvent(_event: DepositEvent) {
    console.log('Sending mail about deposit');
  }
}

const processor = new EmailProcessor()

export const handler = (handlerEvent: EventBridgeEvent<any, any>) => {
  switch (handlerEvent['detail-type']) {
    case BankAccountCreatedEvent.toString():  {
      processor.handleCreatedEvent(handlerEvent.detail)
    }
    break;
    case DepositEvent.toString(): {
      processor.handleDepositEvent(handlerEvent.detail)
    }
  }
}