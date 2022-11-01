import {App, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new NodejsFunction(this, 'MyFunction', {
      entry: 'src/app/test.ts',
      handler: 'handler',
    })
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();