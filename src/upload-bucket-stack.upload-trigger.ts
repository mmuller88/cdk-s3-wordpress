// eslint-disable-next-line import/no-extraneous-dependencies
// import { execSync } from 'child_process';
import * as lambda from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-require-imports
// const { readFileSync } = require('fs');


export async function handler(event: lambda.S3CreateEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  const fileName = event.Records[0].s3.object.key;
  fileName;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const SSH = require('simple-ssh');
  const pemfile = 'my.pem';
  const user = 'wp';
  const host = 'b9emwoc.myraidbox.de';

  // all this config could be passed in via the event
  const ssh = new SSH({
    host: host,
    user: user,
    key: fs.readFileSync(pemfile),
  });

  // let cmd = 'wp';
  // if (event.cmd == 'long') {
  //   cmd += ' -l';
  // }

  let prom = new Promise(function (resolve, reject) {

    let ourout = '';

    ssh.exec('wp', {
      exit: function () {
        ourout += '\nsuccessfully exited!';
        resolve(ourout);
      },
      out: (stdout: any) => {
        ourout += stdout;
      },
    }).start({
      success: () => {
        console.log('successful connection!');
      },
      fail: (e: any) => {
        console.log('failed connection, boo');
        console.log(e);
      },
    });

  });

  const res = await prom;
  console.debug(`res: ${JSON.stringify(res)}`);


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