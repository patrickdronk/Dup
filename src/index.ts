import {CreateBankAccountCommand} from "./domain/commands";
import commandBus from './domain/CommandBus'


// @ts-ignore
const work = async () => {
    const command = new CreateBankAccountCommand("bankAccountId")
    commandBus.send(command)
}

work()