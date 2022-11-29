import { EventBridgeEvent } from 'aws-lambda';

export class EmailProcessor {

}

//region generate processor
const processor = new EmailProcessor();

export const handler = async (handlerEvent: EventBridgeEvent<any, any>) => {
  switch (handlerEvent['detail-type']) {
    case 'BankAccountCreatedEvent': {
      await processor.handleCreatedEvent(handlerEvent.detail);
    }
      break;
    case 'DepositEvent': {
      await processor.handleDepositEvent(handlerEvent.detail);
    }
  }
};
//endregion