import {CreateBankAccountCommand} from "./domain/commands";
import commandBus from './domain/CommandBus'

const command = new CreateBankAccountCommand("bankAccountId")

commandBus.send(command)