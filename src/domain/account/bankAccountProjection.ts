import { EventHandler } from '../../dup/decorators';
import { BankAccountCreatedEvent } from './events';

export class BankAccountProjection {
  @EventHandler
  async on(event: BankAccountCreatedEvent) {
    console.log("handling event :)")
  }
}
