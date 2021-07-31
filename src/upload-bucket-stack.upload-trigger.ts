// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambda from 'aws-lambda';

export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  const fileName = event.Records[0].s3.object.key;

  console.debug('Got an Invoke Request.');
};