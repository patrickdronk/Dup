import { App, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
// import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as events from 'aws-cdk-lib/aws-events';
// import * as targets from "aws-cdk-lib/aws-events-targets"
import { EventBus } from 'aws-cdk-lib/aws-events';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const customEventBus = new EventBus(this, 'CustomEventBus', {
      eventBusName: 'dup-event-bus',
    });

    // const cooleLambda = new NodejsFunction(this, 'MyFunction', {
    //     entry: 'src/app/test.ts',
    //     handler: 'handler',
    // });
    //
    // const cooleLambdaTarget = new targets.LambdaFunction(cooleLambda);

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

    const dup = new NodejsFunction(this, 'dup-temp-runner', {
      entry: 'src/index.ts',
      handler: 'work',
      bundling: {
        preCompilation: true,
        commandHooks: {
          beforeInstall(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return ['tsc'];
          },
          afterBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },

        },
      },
    });

    table.grantReadWriteData(dup);
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();