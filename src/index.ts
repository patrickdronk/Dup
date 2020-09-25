import {CommandProcessor} from "./dup/command/CommandProcessor";
import {EventProcessor} from "./dup/event/EventProcessor";
import {commandbus, createBankAccountCommand, depositMoneyCommand} from "./dup/command/commandbus";
import {GenericEventProcessor} from "./dup/event/GenericEventProcessor";

//making the handler listen
const commandProcessor = new CommandProcessor();
commandProcessor.listen();
const eventProcessor = new GenericEventProcessor();
eventProcessor.listen();

//entrypoint API
commandbus.publish(createBankAccountCommand({id: "123456789"}));
commandbus.publish(depositMoneyCommand({id: "123456789",amount:10.00}));

//unsubscribing
commandProcessor.unlisten();
eventProcessor.unlisten();
