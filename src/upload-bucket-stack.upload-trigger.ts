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

  const objectKey = event.Records[0].s3.object.key;
  const videoLink = `https://${record.s3.bucket.name}.s3.${record.awsRegion}.amazonaws.com/${objectKey}`;

  // DateiName: LektionID_Kategorie_Titel
  // z.B. 001_kategorie1_Das-ist-die-erste-Lektion.mp4
  // Kategorien: Grundlagen

  const fileName = objectKey.split('.')[0]; // z.B. 001_kategorie1_Das-ist-die-erste-Lektion
  const videoFormat = objectKey.split('.')[1]; // z.B. mp4
  videoFormat;
  const splittedFilename = fileName.split('_');
  const lection = Number(splittedFilename[0]); // z.B. 1
  const category = splittedFilename[1]; // z.B. kategorie1
  category;
  const title = splittedFilename[2].replace(/-/g, ' '); // z.B. Das ist die erste Lektion


  console.debug(`video info: ${lection} ${category} ${title} ${videoFormat}`);

  const wpContent = `[vc_row][vc_column][vc_column_text]

Lektion ${lection}: ${title}

[/vc_column_text][us_separator][vc_column_text]

Hier befindet sich ein Text indem der Inhalt der Lektion beschrieben wird

<video poster="PATH-TO-STILL-IMAGE" controls="controls" controlsList=”nodownload” width="640" height="360">
    <source src="${videoLink}" type="video/mp4">
</video>

`;

  // [/vc_column_text][us_separator size="small"][vc_video 1="href=\`\`${videoLink}\`\`>${videoLink}\`\`" link="${videoLink}" hide_video_title="1" align="center"][/vc_column][/vc_row]

  const wpCommand = `wp-staging post create --post_title='${title}' --post_content='${wpContent}'`; // category?

  await ssh.execCommand(wpCommand/*, { cwd:'/var/www' }*/).then(result => {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });
};