import {CommandProcessor} from "./dup/command/CommandProcessor";
import commandBus from "./dup/command/commandbus";
import {CreateBankAccountCommand, DepositCommand, WithdrawalCommand} from "./domain/account/commands";

const bankAccountId = "2";

//making the handler listen
const work = async () => {
    const commandProcessor = new CommandProcessor();
    commandProcessor.listen();

    // entrypoint API
    // commandBus.publish(new CreateBankAccountCommand(bankAccountId));
    // await sleep(200)
    // commandBus.publish(new DepositCommand(bankAccountId, 10));
    // await sleep(200)
    commandBus.publish(new WithdrawalCommand(bankAccountId, 1));
    await sleep(200)

}
const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

work()
