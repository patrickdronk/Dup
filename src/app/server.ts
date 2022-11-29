import { createServer, GraphQLYogaError } from '@graphql-yoga/node';
import { createSchema } from 'graphql-yoga';
import { CommandBus } from '../dup/bus/command-bus';
import { CommandProcessor } from '../dup/commandProcessor';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './bankAccount/commands';

const commandBus = new CommandBus();
new CommandProcessor(commandBus);

const schema = createSchema({
  typeDefs: `
    type Query {
        balance: String
    }
    type Mutation {
      createBankAccount(aggregateId: String): String
      deposit(aggregateId: String, amount: Int): String
      withdraw(aggregateId: String, amount: Int): String
    }
  `,
  resolvers: {
    Query: {
      balance: () => 'hoi',
    },
    Mutation: {
      createBankAccount: async (_, { aggregateId }) => {
        await commandBus.dispatch('CreateBankAccountCommand', new CreateBankAccountCommand(aggregateId));
        return 'OK';
      },
      deposit: async (_, { aggregateId, amount }) => {
        await commandBus.dispatch('DepositCommand', new DepositCommand(aggregateId, amount));
        return 'OK';
      },
      withdraw: async (_, { aggregateId, amount }) => {
        try {
          await commandBus.dispatch('WithdrawalCommand', new WithdrawalCommand(aggregateId, amount));
          return 'OK';
        } catch (err: any) {
          throw new GraphQLYogaError(err.message);
        }
      },
    },
  },
});

export const server = createServer({
  schema,
});