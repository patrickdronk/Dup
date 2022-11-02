import { EventHandler, HavismeHandler } from '../../dup/decorators';

export const handler(message: EventBridgeMessage) => {

}

class UserCreatedEvent {
    constructor(readonly username: string) {
    }
}

class BankAccountEventProcessor {
    constructor() {
    }

    @HavismeHandler
    handle(event: UserCreatedEvent) {
    }
}