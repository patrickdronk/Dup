import { EventBridgeEvent } from 'aws-lambda';
import { BankAccountCreatedEvent, DepositEvent, WithdrawalEvent } from '../events';

class BankaccountProjectionProcessor {
  async handleCreatedEvent(event: BankAccountCreatedEvent) {
    console.log(`Create a projection for this new bankaccount ${event.aggregateId}`);
  }

  async handleDepositEvent(event: DepositEvent) {
    console.log(`Increment the balance of the bankaccount ${event.aggregateId} by ${event.amount}`);
  }

  async handleWithdrawalEvent(event: WithdrawalEvent) {
    console.log(`Decrement the balance of the bankaccount ${event.aggregateId} by ${event.amount}`);
  }
}

const processor = new BankaccountProjectionProcessor();

export const handler = async (handlerEvent: EventBridgeEvent<any, any>) => {
  switch (handlerEvent['detail-type']) {
    case 'BankAccountCreatedEvent': {
      await processor.handleCreatedEvent(handlerEvent.detail);
      break;
    }
    case 'DepositEvent': {
      await processor.handleDepositEvent(handlerEvent.detail);
      break;
    }
    case 'WithdrawalEvent': {
      await processor.handleWithdrawalEvent(handlerEvent.detail);
    }
  }
};