// eslint-disable-next-line import/no-extraneous-dependencies
// import { execSync } from 'child_process';
import * as lambda from 'aws-lambda';

import * as AWS from 'aws-sdk';
var secretsmanager = new AWS.SecretsManager();

// eslint-disable-next-line @typescript-eslint/no-require-imports
import { Client } from 'ssh2';

// eslint-disable-next-line @typescript-eslint/no-require-imports
// const { readFileSync } = require('fs');

// const SSH_KEY = process.env.SSH_KEY || 'noSshKey';

// const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  // const fileName = event.Records[0].s3.object.key;
  // fileName;

  const sshKey = await (await secretsmanager.getSecretValue({ SecretId: 'build/wordpress/raidbox/sshkey' }).promise()).SecretString;

  const conn = new Client();
  conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('wp', (err, stream) => {
      if (err) throw err;
      stream.on('close', (code: string, signal: string) => {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', (data: string) => {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }).connect({
    host: 'b9emwoc.myraidbox.de',
    port: 22,
    username: 'wp',
    privateKey: sshKey,
  });

  // console.debug(`res: ${JSON.stringify(res)}`);


  // await ssh.connect({
  //   host: 'b9emwoc.myraidbox.de',
  //   username: 'wp',
  //   privateKey: '/home/steel/.ssh/id_rsa',
  // });

  // await ssh.execCommand('wp'/*, { cwd: '/var/www' }*/).then(function (result) {
  //   console.log('STDOUT: ' + result.stdout);
  //   console.log('STDERR: ' + result.stderr);
  // });

  // try {
  // await execSync('find / -name "ssh"');
  // } catch (e) {
  //   console.debug('Got an Invoke Request.');
  // }
};