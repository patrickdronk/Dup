#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DUPStack } from '../lib/dup-stack';

const app = new cdk.App();
new DUPStack(app, 'DUPStack');
