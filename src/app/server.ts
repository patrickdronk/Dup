import { createServer } from '@graphql-yoga/node';
import { createSchema } from 'graphql-yoga';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './bankAccount/commands';
import { CommandBus } from '../dup/bus/command-bus';
import { CommandProcessor } from '../dup/commandProcessor';

const commandBus = new CommandBus();
new CommandProcessor(commandBus);

const schema = createSchema({
    typeDefs: `
    type Mutation {
      createBankAccount(aggregateId: String): String
      deposit(aggregateId: String, amount: Number): String
      withdraw(aggregateId: String, amount: Number): String
    }
  `,
    resolvers: {
        Mutation: {
            createBankAccount: async (aggregateId: string) => {
                await commandBus.dispatch("CreateBankAccountCommand", new CreateBankAccountCommand(aggregateId))
            },
            deposit: async (aggregateId: string, amount: number) => {
                await commandBus.dispatch("DepositCommand", new DepositCommand(aggregateId, amount))
            },
            withdraw: async (aggregateId: string, amount: number) => {
                await commandBus.dispatch("WithdrawalCommand", new WithdrawalCommand(aggregateId, amount))
            }
        }
    }
})

export const server = createServer({
    schema
});