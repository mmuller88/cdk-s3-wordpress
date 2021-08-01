// eslint-disable-next-line import/no-extraneous-dependencies
// import { execSync } from 'child_process';
import * as lambda from 'aws-lambda';
import { NodeSSH } from 'node-ssh';

export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  const fileName = event.Records[0].s3.object.key;
  fileName;

  const ssh = new NodeSSH();

  await ssh.connect({
    host: 'b9emwoc.myraidbox.de',
    username: 'wp',
    privateKey: '/home/steel/.ssh/id_rsa',
  });

  await ssh.execCommand('wp'/*, { cwd: '/var/www' }*/).then(function (result) {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });

  // try {
  // await execSync('find / -name "ssh"');
  // } catch (e) {
  //   console.debug('Got an Invoke Request.');
  // }

  console.debug('Got an Invoke Request.');
};