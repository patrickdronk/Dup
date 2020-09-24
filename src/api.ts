import {commandBus, createBankAccountCommand} from "./process/commandBus";

export function callCommandEndpointCreateAccount(): void {
    //POST with id 1234





    commandBus.publish(createBankAccountCommand({id: "123456789"}));
}