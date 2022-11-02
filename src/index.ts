/*
    normally commands will be received via an API, however for now we will manually invoke our lib with this index.ts
 */

// import { uuid } from 'uuidv4';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './app/bankAccount/commands';
import { CommandBus } from './dup/bus/command-bus';
import { CommandProcessor } from './dup/commandProcessor';
import { ICommand } from './dup/command/command';

const commandBus = new CommandBus();
new CommandProcessor(commandBus);

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
};

//fixme
export const work = async (event: any) => {
  // const aggregateId = uuid();

  const command = getCommand(event.commandName, event.command)
  await commandBus.dispatch(event.commandName, command);

  // commandBus.dispatch('DepositCommand', new DepositCommand(aggregateId, 50));
  // await timeout(2000);
  // commandBus.dispatch('WithdrawalCommand', new WithdrawalCommand(aggregateId, 20));
  // await timeout(2000);
};

const getCommand = (commandName: string, command: any): ICommand => {
  switch(commandName){
    case "CreateBankAccountCommand": return new CreateBankAccountCommand(command.aggregateId)
    case "DepositCommand": return new DepositCommand(command.aggregateId, command.amount)
    case "WithdrawalCommand": return new WithdrawalCommand(command.aggregateId, command.amount)
    default: return new CreateBankAccountCommand(command.aggregateId)
  }
}
