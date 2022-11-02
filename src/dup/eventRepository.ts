import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DomainEvent } from './event/event';

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const save = async (event: DomainEvent) => {
  const command = new PutCommand({
    TableName: 'events',
    Item: {
      ...event,
    },
  });

  try {
    await db.send(command);
  } catch (err: any) {
    console.error(err);
  }
};

export const getAllDomainEventsByAggregateId = async(aggregateId: string) => {
  const queryCommand = new QueryCommand({
    TableName: 'events',
    IndexName: 'aggregateIdIdx',
    KeyConditionExpression: '#aggregateId = :aggregateId',
    ExpressionAttributeNames: {
      '#aggregateId': 'aggregateId',
    },
    ExpressionAttributeValues: {
      ':aggregateId': aggregateId,
    },
  });

  const { Items: items } = await db.send(queryCommand);

  const sortedItems = items!!.sort(function(a,b){
    // @ts-ignore
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return sortedItems as DomainEvent[];
};