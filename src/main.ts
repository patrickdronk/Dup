import { App, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
// import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import { DockerImageFunction, DockerImageCode } from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
// import * as targets from "aws-cdk-lib/aws-events-targets"
import { EventBus } from 'aws-cdk-lib/aws-events';
// import { Code, Function } from 'aws-cdk-lib/aws-lambda';
// import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path from 'path';

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

    //VIKTOR --> TODO
    // zoek in src naar alle files die eindigen op .processor
    // of gebruik reflectie

    // Reflection. Test wanneer reflection in de pipeline werkt
    // placeholder

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

    // const dup = new NodejsFunction(this, 'dup-temp-runner', {
    //   entry: 'src/index.ts',
    //   handler: 'work',
    //   bundling: {
    //     preCompilation: true,
    //   },
    // });


    table.grantReadWriteData(dup);
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();