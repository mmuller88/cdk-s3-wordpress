// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambda from 'aws-lambda';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require('child_process');


export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  const fileName = event.Records[0].s3.object.key;
  fileName;

  exec('ssh', (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  console.debug('Got an Invoke Request.');
};