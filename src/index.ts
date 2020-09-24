import {CommandProcessor} from "./process/CommandProcessor";
import {EventProcessor} from "./process/EventProcessor";
import {commandbus, createBankAccountCommand, depositMoneyCommand} from "./process/commandbus";

//making the handler listen
const commandProcessor = new CommandProcessor();
commandProcessor.listen();
const eventProcessor = new EventProcessor();
eventProcessor.listen();

//entrypoint API
commandbus.publish(createBankAccountCommand({id: "123456789"}));
commandbus.publish(depositMoneyCommand({id: "123456789",amount:10.00}));

//unsubscribing
commandProcessor.unlisten();
eventProcessor.unlisten();
