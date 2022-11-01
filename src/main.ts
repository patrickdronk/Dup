import {App, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as events from "aws-cdk-lib/aws-events"
import {CfnEventBusPolicy, EventBus} from "aws-cdk-lib/aws-events";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new NodejsFunction(this, 'MyFunction', {
      entry: 'src/app/test.ts',
      handler: 'handler',
    });

    const customEventBus = new EventBus(this, "CustomEventBus", {
      eventBusName: "customer-subscription-bus"
    });

    //Adding a resource based policy to custom event bus
    new CfnEventBusPolicy(this,"EventBusResourcePolicy", {
      statementId: "CustomerSubscriptionSid",
      eventBusName: customEventBus.eventBusName,
      statement:
          {
            "Effect": "Allow",
            "Action": [
              "events:PutEvents"
            ],
            "Principal": {
              "AWS": this.account
            },
            "Resource": customEventBus.eventBusArn,
            "Condition": {
              "StringEquals": {
                "events:detail-type": "customer-subscription",
                "events:source": "com.duleendra.customerapp"
              }
            }
          }
    });

    /*
    new events.Rule(this, "fiveMinuteRule", {
      schedule: events.Schedule.cron({ minute: "0/5" }),
    });
    
     */
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();