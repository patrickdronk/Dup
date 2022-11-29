import path, { join } from 'path';
import { App, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { DockerImageCode, DockerImageFunction, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import 'reflect-metadata';
import { readFileSync } from 'fs';
import * as glob from 'glob';

interface ProcessFileResponse {
  processorName: string;
  processorFilePath: string;
  processorEvents: string[];
}

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const dockerFile = path.join(__dirname, '../');

    const dup = new DockerImageFunction(this, 'dup-docker-runner', {
      code: DockerImageCode.fromImageAsset(dockerFile),
      functionName: 'dup-docker-runner',
      memorySize: 1024,
      timeout: Duration.seconds(30),
    });
    dup.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    const customEventBus = new EventBus(this, 'CustomEventBus', {
      eventBusName: 'dup-event-bus',
    });

    customEventBus.grantPutEventsTo(dup);

    const bankAccountProjectionsTable = new Table(this, 'bankAccountProjectionsDB', {
      tableName: 'bankAccountProjection',
      partitionKey: {
        name: 'aggregateId',
        type: AttributeType.STRING,
      },
    });

    bankAccountProjectionsTable.grantReadData(dup);


    const processorFiles = handleProcessorFiles();
    for (let processor of processorFiles) {
      const processorLambda = new NodejsFunction(this, `lambda-${processor.processorName}`, {
        functionName: processor.processorName.replaceAll('.', '_'),
        entry: processor.processorFilePath,
        handler: 'handler',
        memorySize: 1024,
        timeout: Duration.seconds(30),
      });

      bankAccountProjectionsTable.grantReadWriteData(processorLambda);

      for (let event of processor.processorEvents) {
        new events.Rule(this, `rule-${processor.processorName}-${event}`, {
          eventBus: customEventBus,
          eventPattern: {
            detailType: [event],
          },
          targets: [new LambdaFunction(processorLambda)],
        });
      }
    }

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

    table.grantReadWriteData(dup);
  }
}

//ToDo what does processFile do?
const processFile = (filePath: string): string[] => {
  let events = [];

  //read the contents of the file
  const fileContent = readFileSync(filePath, 'utf-8');

  const regex = /event:?\s+(\w+)/gm;
  const matches = fileContent.matchAll(regex);

  for (const match of matches) {
    events.push(match[1]);
  }

  return events;
};

//ToDo what does handleProcessorFiles do?
export const handleProcessorFiles = (): ProcessFileResponse[] => {
  const cwd = join(__dirname, 'app');
  const processorFilePaths = glob
    .sync('**/*processor.ts', { cwd })
    .map((p) => join(cwd, p));

  //ToDo refactor to use map function
  let files: ProcessFileResponse[] = [];
  for (let processorFilePath of processorFilePaths) {
    const splittedFilePath = processorFilePath.split('/');

    const processorEvents = processFile(processorFilePath);
    const processorName = splittedFilePath[splittedFilePath.length - 1];

    files.push({
      processorFilePath,
      processorEvents,
      processorName,
    });
  }

  return files;
};

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();