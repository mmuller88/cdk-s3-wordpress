import * as lambda from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { NodeSSH } from 'node-ssh';

var secretsmanager = new AWS.SecretsManager();

export async function handler(event: lambda.S3CreateEvent) {
  console.debug(`event: ${JSON.stringify(event)}`);

  const record = event.Records[0];

  const sshKey = await (await secretsmanager.getSecretValue({ SecretId: 'sshkey' }).promise()).SecretString;

  const ssh = new NodeSSH();
  await ssh.connect({
    host: 'mywordpresshoster.com',
    username: 'wp',
    privateKey: sshKey,
  });

  const objectKey = event.Records[0].s3.object.key;
  const videoLink = `https://${record.s3.bucket.name}.s3.${record.awsRegion}.amazonaws.com/${objectKey}`;

  // DateiName: LektionID_KategorieID_Titel
  // eg. 001_41_Das-ist-die-erste-Lektion.mp4
  // Kategorien: 41 - Grundlagen

  const fileName = objectKey.split('.')[0]; // eg. 001_kategorie1_Das-ist-die-erste-Lektion
  const videoFormat = objectKey.split('.')[1]; // eg. mp4
  videoFormat;
  const splittedFilename = fileName.split('_');
  const lection = Number(splittedFilename[0]); // eg. 1
  const category = Number(splittedFilename[1]); // eg. 41
  category;
  const title = splittedFilename[2].replace(/-/g, ' '); // eg. Das ist die erste Lektion


  console.debug(`video info: ${lection} ${category} ${title} ${videoFormat}`);

  const wpContent = `[vc_row][vc_column][vc_column_text]

Lektion ${lection}: ${title}

[/vc_column_text][us_separator][vc_column_text]

Here will be some content ...

<video poster="PATH-TO-STILL-IMAGE" controls="controls" controlsList=”nodownload” width="640" height="360">
    <source src="${videoLink}" type="video/mp4">
</video>

`;

  const wpCommand = `wp post create --post_title='${title}' --post_categories='${category}' --post_content='${wpContent}'`; // category?

  await ssh.execCommand(wpCommand/*, { cwd:'/var/www' }*/).then(result => {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });
};
