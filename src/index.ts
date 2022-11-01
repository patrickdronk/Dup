/*
    normally commands will be received via an API, however for now we will manually invoke our lib with this index.ts
 */

import {CommandBus} from "./dup/bus/command-bus";
import {CommandProcessor} from "./dup/commandProcessor";
import {CreateBankAccountCommand, DepositCommand, WithdrawalCommand} from "./app/bankAccount/commands";
import {uuid} from "uuidv4";

const commandBus = new CommandBus()
new CommandProcessor(commandBus)

const timeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), ms)
    })
}

//fixme
const work = async () => {
    const aggregateId = uuid()
    commandBus.dispatch("CreateBankAccountCommand", new CreateBankAccountCommand(aggregateId))
    await timeout(2000)
    commandBus.dispatch("DepositCommand", new DepositCommand(aggregateId, 50))
    await timeout(2000)
    commandBus.dispatch("WithdrawalCommand", new WithdrawalCommand(aggregateId, 20))
}

work()


