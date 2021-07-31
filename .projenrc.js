const { AwsCdkTypeScriptApp } = require('projen');

const deps = [
  '@types/aws-lambda',
  'aws-lambda',
  'aws-sdk',
  'esbuild@^0',
  'aws-cdk-staging-pipeline',
  'cdk-appsync-transformer',
  'cdk-iam-floyd',
];

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'martin.mueller',
  cdkVersion: '1.116.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  name: 'video-up',
  cdkDependencies: [
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-lambda',
  ],
  deps,
});
project.synth();