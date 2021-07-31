// import * as lambda from '@aws-cdk/aws-lambda';
// import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
// import * as db from '@aws-cdk/aws-dynamodb';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
// import * as statement from 'cdk-iam-floyd';

export interface UploadBucketStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class UploadBucketStack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: UploadBucketStackProps) {
    super(scope, id, props);


    // Outputs
    // const graphql = new cdk.CfnOutput(this, 'appsyncEndpointOutput', {
    //   description: 'GraphQL Endpoint',
    //   value: this.appSyncTransformer.appsyncAPI.graphqlUrl,
    // });
    // this.cfnOutputs.appsyncEndpointOutput = graphql;
  }
}