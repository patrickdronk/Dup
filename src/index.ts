import {CommandProcessor} from "./dup/CommandProcessor";
import {EventProcessor} from "./dup/EventProcessor";
import {commandbus, createBankAccountCommand, depositMoneyCommand} from "./dup/commandbus";

//making the handler listen
const commandProcessor = new CommandProcessor();
commandProcessor.listen();
const eventProcessor = new EventProcessor();
eventProcessor.listen();

//entrypoint API
commandbus.publish(createBankAccountCommand({id: "1234567890"}));

commandbus.publish(depositMoneyCommand({id: "1234567890",amount:10.00}));

//unsubscribing
commandProcessor.unlisten();
eventProcessor.unlisten();
