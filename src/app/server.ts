import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { createServer, GraphQLYogaError } from '@graphql-yoga/node';
import { createSchema } from 'graphql-yoga';
import { CommandBus } from '../dup/bus/command-bus';
import { CommandProcessor } from '../dup/commandProcessor';
import { CreateBankAccountCommand, DepositCommand, WithdrawalCommand } from './bankAccount/commands';
import { BankAccountProjection } from './bankAccount/processors/bankaccountProjection';

const commandBus = new CommandBus();
new CommandProcessor(commandBus);

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const schema = createSchema({
  typeDefs: `
    type Query {
        balance(aggregateId: String): number
    }
    type Mutation {
      createBankAccount(aggregateId: String): String
      deposit(aggregateId: String, amount: Int): String
      withdraw(aggregateId: String, amount: Int): String
    }
  `,
  resolvers: {
    Query: {
      balance: async (_, { aggregateId }) => {
        const command = new GetCommand({
          TableName: 'bankAccountProjection',
          Key: {
            aggregateId: aggregateId,
          },
        });

        try {
          const result = await db.send(command);
          return result.Item as BankAccountProjection;
        } catch (err: any) {
          console.error(err);
          throw err;
        }
      },
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