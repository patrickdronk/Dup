/*
    normally commands will be received via an API, however for now we will manually invoke our lib with this index.ts
 */

import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './app/bankAccount/commands';
import { CommandBus } from './dup/bus/command-bus';
import { CommandProcessor } from './dup/commandProcessor';
import { ICommand } from './dup/command/command';

const commandBus = new CommandBus();
new CommandProcessor(commandBus);

//fixme
export const work = async (event: any) => {
  console.log("event:", event)

  const command = getCommand(event.commandName, event.command)
  commandBus.dispatch(event.commandName, command);
};

const getCommand = (commandName: string, command: any) : ICommand => {
  switch(commandName) {
    case 'CreateBankAccountCommand': return new CreateBankAccountCommand(command.aggregateId)
    case 'WithdrawalCommand': return new WithdrawalCommand(command.aggregateId, command.amount)
    case 'DepositCommand': return new DepositCommand(command.aggregateId, command.amount)
    default: return new CreateBankAccountCommand(command.aggregateId)
  }
}