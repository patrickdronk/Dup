import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { EventBridgeEvent } from 'aws-lambda';
import { BankAccountCreatedEvent, DepositEvent, WithdrawalEvent } from '../events';

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

interface BankAccountProjection {
  aggregateId: string;
  balance: number;
}

class BankaccountProjectionProcessor {
  async handleCreatedEvent(event: BankAccountCreatedEvent) {
    await this.save({
      aggregateId: event.aggregateId,
      balance: 0,
    });
  }

  async handleDepositEvent(event: DepositEvent) {
    const bankAccountProjection = await this.fetch(event.aggregateId);
    bankAccountProjection.balance += event.amount;
    await this.save(bankAccountProjection);
  }

  async handleWithdrawalEvent(event: WithdrawalEvent) {
    const bankAccountProjection = await this.fetch(event.aggregateId);
    bankAccountProjection.balance -= event.amount;
    await this.save(bankAccountProjection);
  }

  async fetch(aggregateId: string): Promise<BankAccountProjection> {
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
  }

  async save(projection: BankAccountProjection) {
    const command = new PutCommand({
      TableName: 'bankAccountProjection',
      Item: {
        ...projection,
      },
    });

    try {
      await db.send(command);
    } catch (err: any) {
      console.error(err);
    }
  }
}

const processor = new BankaccountProjectionProcessor();

export const handler = async (handlerEvent: EventBridgeEvent<any, any>) => {
  switch (handlerEvent['detail-type']) {
    case 'BankAccountCreatedEvent': {
      await processor.handleCreatedEvent(handlerEvent.detail);
      break;
    }
    case 'DepositEvent': {
      await processor.handleDepositEvent(handlerEvent.detail);
      break;
    }
    case 'WithdrawalEvent': {
      await processor.handleWithdrawalEvent(handlerEvent.detail);
    }
  }
};