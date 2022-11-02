import { App, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { DockerImageCode, DockerImageFunction, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';
import path from 'path';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const customEventBus = new EventBus(this, 'CustomEventBus', {
      eventBusName: 'dup-event-bus',
    });

    new events.Rule(this, 'fiveMinuteRule', {
      eventBus: customEventBus,
      eventPattern: {
        detailType: ['dup-event-bus'],
      },
      targets: [],
    });

    const table = new Table(this, 'eventsDB', {
      tableName: 'events',
      partitionKey: {
        name: 'eventId',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'timestamp',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    table.addGlobalSecondaryIndex({
      indexName: 'aggregateIdIdx',
      partitionKey: {
        name: 'aggregateId',
        type: AttributeType.STRING,
      },
    });

    const dockerFile = path.join(__dirname, '../')

    const dup = new DockerImageFunction(this, 'dup-docker-runner', {
      code: DockerImageCode.fromImageAsset(dockerFile)
    })

    dup.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    table.grantReadWriteData(dup);
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();