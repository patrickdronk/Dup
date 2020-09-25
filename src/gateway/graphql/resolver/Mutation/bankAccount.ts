import {CommandProcessor} from "../../../../dup/CommandProcessor";
import {EventProcessor} from "../../../../dup/EventProcessor";
import {commandbus, createBankAccountCommand} from "../../../../dup/commandbus";


exports.bankAccount = async (account:any) => {
    console.log(account)
    //making the handler listen
    const commandProcessor = new CommandProcessor();
    commandProcessor.listen();
    const eventProcessor = new EventProcessor();
    eventProcessor.listen();

    commandbus.publish(createBankAccountCommand({id:'dd'}));

    return {
        message: 'Successfully created account'
    };
}
