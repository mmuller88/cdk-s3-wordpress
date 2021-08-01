// eslint-disable-next-line import/no-extraneous-dependencies
// import { execSync } from 'child_process';
import * as lambda from 'aws-lambda';

import * as AWS from 'aws-sdk';
var secretsmanager = new AWS.SecretsManager();

import { NodeSSH } from 'node-ssh';

export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  // const fileName = event.Records[0].s3.object.key;
  // fileName;

  const sshKey = await (await secretsmanager.getSecretValue({ SecretId: 'build/wordpress/raidbox/sshkey' }).promise()).SecretString;

  const ssh = new NodeSSH();
  await ssh.connect({
    host: 'b9emwoc.myraidbox.de',
    username: 'wp',
    privateKey: sshKey,
  });

  await ssh.execCommand('wp'/*, { cwd:'/var/www' }*/).then(result => {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });
};