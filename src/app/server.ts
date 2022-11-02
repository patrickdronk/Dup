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
      deposit(aggregateId: String, amount: Int): String
      withdraw(aggregateId: String, amount: Int): String
    }
  `,
    resolvers: {
        Mutation: {
            createBankAccount: async (aggregateId: string) => {
                await commandBus.dispatch("CreateBankAccountCommand", new CreateBankAccountCommand(aggregateId))
                return "OK"
            },
            deposit: async (aggregateId: string, amount: number) => {
                await commandBus.dispatch("DepositCommand", new DepositCommand(aggregateId, amount))
                return "OK"
            },
            withdraw: async (aggregateId: string, amount: number) => {
                await commandBus.dispatch("WithdrawalCommand", new WithdrawalCommand(aggregateId, amount))
                return "OK"
            }
        }
    }
})

export const server = createServer({
    schema
});