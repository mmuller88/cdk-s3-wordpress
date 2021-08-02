import * as lambda from 'aws-lambda';

import * as AWS from 'aws-sdk';
var secretsmanager = new AWS.SecretsManager();

import { NodeSSH } from 'node-ssh';

export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  const record = event.Records[0];

  const sshKey = await (await secretsmanager.getSecretValue({ SecretId: 'build/wordpress/raidbox/sshkey' }).promise()).SecretString;

  const ssh = new NodeSSH();
  await ssh.connect({
    host: 'b9emwoc.myraidbox.de',
    username: 'wp',
    privateKey: sshKey,
  });

  // https://hacklab-videos.s3.eu-central-1.amazonaws.com/ddb-stream-lambda.mp4

  const fileName = event.Records[0].s3.object.key;
  const videoLink = `https://${record.s3.bucket.name}.s3.${record.awsRegion}.amazonaws.com/${fileName}`;

  const wpCommand = `wp-staging post create --post_title='${fileName}' --post_content='CONTENT von ${fileName}. ${videoLink}'`;


  await ssh.execCommand(wpCommand/*, { cwd:'/var/www' }*/).then(result => {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });
};