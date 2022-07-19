import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Port, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { PrismaFunction } from './constructs/prisma-function';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';

export class DUPStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = this.createVpc();

    const dbSecurityGroup = new ec2.SecurityGroup(this, `DBSecurityGroup`, {
      vpc
    });

    const lambdaSecurityGroup = new ec2.SecurityGroup(this, `LambdaSecurityGroup`, {
      vpc
    });

    const database = this.createDatabase(vpc, dbSecurityGroup);

    const dbCredentials = {
      host: database.secret!.secretValueFromJson('host')
        .unsafeUnwrap(),
      port: database.secret!.secretValueFromJson('port')
        .unsafeUnwrap(),
      engine: database.secret!.secretValueFromJson('engine')
        .unsafeUnwrap(),
      username: database.secret!.secretValueFromJson('username')
        .unsafeUnwrap(),
      password: database.secret!.secretValueFromJson('password')
        .unsafeUnwrap(),
    };

    const migrationRunner = new PrismaFunction(this, 'migration-runner', {
      entry: '../prisma/migration-runner.ts',
      functionName: 'dup-migration-runner',
      memorySize: 256,
      timeout: Duration.minutes(1),
      vpc,
      securityGroups: [lambdaSecurityGroup],
      database: dbCredentials,
      depsLockFilePath: '../package-lock.json',
    });

    const api = new PrismaFunction(this, 'api', {
      entry: '../src/index.ts',
      memorySize: 256,
      timeout: Duration.minutes(1),
      vpc,
      securityGroups: [lambdaSecurityGroup],
      database: dbCredentials,
      depsLockFilePath: '../package-lock.json',
      environment: {
        NODE_ENV: 'development'
      }
    });

    api.addFunctionUrl({authType: FunctionUrlAuthType.NONE})

    dbSecurityGroup.addIngressRule(lambdaSecurityGroup, Port.tcp(5432));

    // Object.getOwnPropertyNames(aggregateStore)
    //   .forEach((processorKey: string) => {
    //     console.log(processorKey);
    //     // const eventProcessor = new eventProcessorStore[processorKey]
    //     // console.log(eventProcessor)
    //   });
    //
    // Object.getOwnPropertyNames(eventProcessorStore)
    //   .forEach((processorKey: string) => {
    //     console.log(processorKey);
    //     // const eventProcessor = new eventProcessorStore[processorKey]
    //     // console.log(eventProcessor)
    //   });

  }

  createVpc(): Vpc {
    return new ec2.Vpc(this, 'default-vpc', {
      vpcName: 'default',
      cidr: '10.0.0.0/16',
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'isolated-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });
  }

  createDatabase(vpc: Vpc, securityGroup: SecurityGroup): DatabaseInstance {
    return new rds.DatabaseInstance(this, 'db-instance', {
      vpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14_2,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO,
      ),
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      iamAuthentication: true,
      multiAz: false,
      autoMinorVersionUpgrade: true,
      backupRetention: Duration.days(0),
      deleteAutomatedBackups: true,
      removalPolicy: RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: 'postgres',
      publiclyAccessible: true,
    });
  }
}
