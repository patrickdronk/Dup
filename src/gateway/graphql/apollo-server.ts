import { ApolloServer } from 'apollo-server-lambda';

import { resolvers } from './resolvers';
import * as fs from "fs";

const typeDefs = fs.readFileSync("./src/gateway/graphql/schema.gql").toString('utf-8');

const apolloServer = new ApolloServer({ resolvers, typeDefs });

export const graphqlHandler = apolloServer.createHandler();
