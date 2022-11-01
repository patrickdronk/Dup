import {App, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
// import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as events from "aws-cdk-lib/aws-events"
// import * as targets from "aws-cdk-lib/aws-events-targets"
import {CfnEventBusPolicy, EventBus} from "aws-cdk-lib/aws-events";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

      const customEventBus = new EventBus(this, "CustomEventBus", {
          eventBusName: "dup-event-bus"
      });

      // const cooleLambda = new NodejsFunction(this, 'MyFunction', {
      //     entry: 'src/app/test.ts',
      //     handler: 'handler',
      // });
      //
      // const cooleLambdaTarget = new targets.LambdaFunction(cooleLambda)

      new events.Rule(this, "fiveMinuteRule", {
          eventBus: customEventBus,
          eventPattern: {
              detailType: ["dup-event-bus"]
          },
          targets: []
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
                "events:detail-type": "dup-event-bus",
                "events:source": "com.vikkie.dup"
              }
            }
          }
    });

    // ARN = arn:aws:events:eu-west-1:051155894342:event-bus/dup-event-bus

    /*


     */
  }
}

const app = new App();

new MyStack(app, 'Dup-dev', {});

app.synth();