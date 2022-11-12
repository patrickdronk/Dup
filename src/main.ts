import path, { join } from 'path';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { DockerImageCode, DockerImageFunction, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import 'reflect-metadata';
import * as glob from 'glob';
import * as fs from 'fs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const customEventBus = new EventBus(this, 'CustomEventBus', {
      eventBusName: 'dup-event-bus',
    });

    // const cooleLambda = new NodejsFunction(this, 'MyFunction', {
    //     entry: 'src/app/findandprocessprocessors.ts',
    //     handler: 'handler',
    // });
    //
    // const cooleLambdaTarget = new targets.LambdaFunction(cooleLambda);

    //VIKTOR --> TODO
    // zoek in src naar alle files die eindigen op .processor

    // todo: make recursive and relative
    // maybe use const {resolve} = require("path");
    const appDir = path.join(__dirname, '/app');
    const processors = getProcessors(appDir);

    processors.forEach((filename: string) => {
      const fileContent = fs.readFileSync(`${appDir}/${filename}`, 'utf-8');
      processFile(fileContent);
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

    const dockerFile = path.join(__dirname, '../');

    const dup = new DockerImageFunction(this, 'dup-docker-runner', {
      code: DockerImageCode.fromImageAsset(dockerFile),
    });

    dup.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    table.grantReadWriteData(dup);

  }
}

const getProcessors = (appDir: string) => {
  return glob
    .sync('**/*processor.ts', { cwd: appDir })
    .map((p) => join(appDir, p));
};

function processFile(content: string) {
  console.log(processFile);
  // Match the first word after "event: " ignoring whitespace and including all new lines, made with autoregen.xyz :-)
  // const regex = /event:\s*\n*\s*(.*)/gm;
  const regex = /([a-z]{2})\w+/gm;
  let m;
  while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();