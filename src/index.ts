
import {callCommandEndpointCreateAccount} from "./api";
import {CommandProcessor} from "./process/CommandProcessor";
import {EventProcessor} from "./process/EventProcessor";

//making the handler listen
const commandProcessor = new CommandProcessor();
commandProcessor.listen();
const eventProcessor = new EventProcessor();
eventProcessor.listen();


//entrypoint API
callCommandEndpointCreateAccount();

//unsubscribing
commandProcessor.unlisten();
eventProcessor.unlisten();
