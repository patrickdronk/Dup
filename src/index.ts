
import {callCommandEndpointCreateAccount} from "./api";
import {CommandProcessor} from "./process/CommandProcessor";

//making the handler listen
const accountCreatedHandler = new CommandProcessor();
accountCreatedHandler.listen();

//entrypoint API
callCommandEndpointCreateAccount();

//unsubscribing
accountCreatedHandler.unlisten();

