import {CommandProcessor} from "./dup/CommandProcessor";
import {EventProcessor} from "./dup/EventProcessor";
import {commandbus, createBankAccountCommand, depositCommand, withdrawalCommand} from "./dup/commandbus";
import {CreateBankAccountCommand, DepositCommand, WithdrawalCommand} from "./domain/account/commands";

const bankAccountId = "2";

//making the handler listen
const work = async () => {
    const commandProcessor = new CommandProcessor();
    const eventProcessor = new EventProcessor();
    commandProcessor.listen();
    eventProcessor.listen();

    // entrypoint API
    // commandbus.publish(createBankAccountCommand(new CreateBankAccountCommand(bankAccountId)));
    // await sleep(200)
    // commandbus.publish(depositCommand(new DepositCommand(bankAccountId, 10)));
    // await sleep(200)
    commandbus.publish(withdrawalCommand(new WithdrawalCommand(bankAccountId, 2)))
    await sleep(200)

    // unsubscribing
    commandProcessor.unlisten();
    eventProcessor.unlisten();
}
const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

work()
