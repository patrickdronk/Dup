import configure from '@vendia/serverless-express';
import { Handler } from 'aws-cdk-lib/aws-lambda';
import { server } from './app/server';

export const handler: Handler = configure({
  app: server,
  log: server.logger,
});