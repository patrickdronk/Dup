// import {CommandProcessor} from "./dup/command/CommandProcessor";
import commandBus from './dup/command/commandbus';
import { CreateBankAccountCommand, } from './domain/account/commands';
//
// const bankAccountId = "2";
//
// //making the handler listen
// const work = async () => {
//     const commandProcessor = new CommandProcessor();
//     commandProcessor.listen();
//
//     // entrypoint API
//     commandBus.publish(new CreateBankAccountCommand(bankAccountId));
//     // await sleep(200)
//     // commandBus.publish(new DepositCommand(bankAccountId, 10));
//     // await sleep(200)
//     // commandBus.publish(new WithdrawalCommand(bankAccountId, 1));
//     await sleep(200)
//
// }
// const sleep = (milliseconds: number) => {
//     return new Promise(resolve => setTimeout(resolve, milliseconds))
// }
//
// work()

import { createServer } from '@graphql-yoga/node';
import configure from '@vendia/serverless-express';
import eventRepository from './dup/event/EventRepository';

const server = createServer({
  schema: {
    typeDefs: `
      type Query {
        hello: String
        events: [DomainEvent!]!
      }
      
      type DomainEvent {
        eventidentifier: String
        aggregateidentifier: String
        aggregate_type: String
        eventsequencenumber: Int
        payload: String
        payload_type: String
        timestamp: String
      }
    `,
    resolvers: {
      Query: {
        hello: async () => {
          console.log("here")
          commandBus.publish(new CreateBankAccountCommand('someBankAccountId'));
          await new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
              resolve('done');
            }, 2000);
          });

          return 'Hello from Yoga!';
        },
        events: () => {
          return eventRepository.getAllEvents();
        }
      },
    },
  }
});

server.start()

// export const handler = configure({
//   app: server
// });
