import { EventHandler } from '../../dup/decorators';

export const handler(message: EventBridgeMessage) => {

}

class UserCreatedEvent {
    constructor(readonly username: string) {
    }
}

class BankAccountEventProcessor {
    constructor() {
    }

    @EventHandler
    handle(event: UserCreatedEvent) {
    }
}