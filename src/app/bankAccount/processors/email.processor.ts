import { BankAccountCreatedEvent, DepositEvent } from '../events';

export class EmailProcessor {

  async handleCreatedEvent(event: BankAccountCreatedEvent) {
    console.log(`Sending email to ${event.aggregateId}`);
  }

  handleDepositEvent(_event: DepositEvent) {
    console.log('Sending mail about deposit');
  }
}