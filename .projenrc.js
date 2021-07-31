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
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/pipelines',
    '@aws-cdk/aws-lambda-event-sources',
  ],
  deps,
  context: {
    '@aws-cdk/core:enableStackNameDuplicates': true,
    'aws-cdk:enableDiffNoFail': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
});

project.setScript('cdkDeploy', 'cdk deploy');
project.setScript('cdkDestroy', 'cdk destroy');
project.setScript('cdkSynth', 'cdk synth');
project.setScript('cdk', 'cdk');

project.synth();