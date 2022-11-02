/*
    normally commands will be received via an API, however for now we will manually invoke our lib with this index.ts
 */

import { uuid } from 'uuidv4';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './app/bankAccount/commands';
import { CommandBus } from './dup/bus/command-bus';
import { CommandProcessor } from './dup/commandProcessor';

const commandBus = new CommandBus();
new CommandProcessor(commandBus);

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
};

//fixme
export const work = async (event: any) => {
  commandBus.dispatch(event.commandName, event.command);
};