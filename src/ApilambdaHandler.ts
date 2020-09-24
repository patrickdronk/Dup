import {commandbus, createBankAccountCommand, depositMoneyCommand} from "./process/commandbus";


export function ApilambdaHandler(): void {
    //POST with id 1234

    commandbus.publish(createBankAccountCommand({id: "123456789"}));
    commandbus.publish(depositMoneyCommand({id: "123456789",amount:10.00}));
}
