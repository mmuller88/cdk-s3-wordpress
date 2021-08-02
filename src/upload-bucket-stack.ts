// import * as lambda from '@aws-cdk/aws-lambda';
import { S3EventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import * as statement from 'cdk-iam-floyd';

export interface UploadBucketStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class UploadBucketStack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: UploadBucketStackProps) {
    super(scope, id, props);

    // Create S3 Bucket
    const bucket = new s3.Bucket(this, 'hacklab-videos', {
      bucketName: 'hacklab-videos',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: true,
    });

    const lambda = new lambdajs.NodejsFunction(this, 'upload-trigger', {
      bundling: {
        externalModules: [
          'ssh2',
        ],
        nodeModules: [
          'ssh2',
        ],
      },
    });

    lambda.addToRolePolicy(new statement.Secretsmanager().allow().toGetSecretValue());

    lambda.addEventSource(new S3EventSource(bucket, {
      events: [s3.EventType.OBJECT_CREATED],
      // filters: [{ prefix: 'subdir/' }], // optional
    }));
  }
}