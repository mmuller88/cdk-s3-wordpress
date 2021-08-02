import * as lambda from 'aws-lambda';

import * as AWS from 'aws-sdk';
var secretsmanager = new AWS.SecretsManager();

import { NodeSSH } from 'node-ssh';

export async function handler(event: lambda.S3CreateEvent) {
  console.debug(`event: ${JSON.stringify(event)}`);

  const record = event.Records[0];

  const sshKey = await (await secretsmanager.getSecretValue({ SecretId: 'build/wordpress/raidbox/sshkey' }).promise()).SecretString;

  const ssh = new NodeSSH();
  await ssh.connect({
    host: 'b9emwoc.myraidbox.de',
    username: 'wp',
    privateKey: sshKey,
  });

  // https://hacklab-videos.s3.eu-central-1.amazonaws.com/hacking-for-noobs.mp4

  const fileName = event.Records[0].s3.object.key;
  const videoLink = `https://${record.s3.bucket.name}.s3.${record.awsRegion}.amazonaws.com/${fileName}`;

  const wpContent = `[vc_row][vc_column][vc_column_text]

Lektion 1: ${fileName}

[/vc_column_text][us_separator][vc_column_text]

Hier befindet sich ein Text indem der Inhalt der Lektion beschrieben wird

[/vc_column_text][us_separator size="small"][vc_video 1="href=\`\`${videoLink}\`\`>${videoLink}\`\`" link="${videoLink}" hide_video_title="1" align="center"][/vc_column][/vc_row]
`;

  const wpCommand = `wp-staging post create --post_title='${fileName}' --post_content='${wpContent}'`;

  await ssh.execCommand(wpCommand/*, { cwd:'/var/www' }*/).then(result => {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });
};