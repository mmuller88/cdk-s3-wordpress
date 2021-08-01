import * as cdk from '@aws-cdk/core';
import { PipelineStack } from 'aws-cdk-staging-pipeline';
import { UploadBucketStack } from './upload-bucket-stack';

const app = new cdk.App();

new PipelineStack(app, 'UploadBucketStack-pipeline', {
  stackName: 'UploadBucketStack-pipeline',
  // Account and region where the pipeline will be build
  env: {
    account: '429736546496',
    region: 'eu-central-1',
  },
  // Staging Accounts e.g. dev qa prod
  stageAccounts: [{
    account: {
      id: '890129220607',
      region: 'eu-central-1',
    },
    stage: 'dev',
  }],
  branch: 'main',
  repositoryName: 'video-up',
  // buildCommand: 'cd frontend && yarn install && yarn build && cd ..',
  customStack: (scope, stageAccount) => {

    const stack = new UploadBucketStack(scope, `UploadBucketStack-${stageAccount.stage}`, {
      // stackName: `UploadBucketStack-${stageAccount.stage}`,
      stage: stageAccount.stage,
      sshKey: cdk.SecretValue.secretsManager('build/wordpress/raidbox/sshkey').toString(),
    });

    return stack;
  },
  // which stage needs a manual approval. Here is only prod
  manualApprovals: (stageAccount) => stageAccount.stage === 'prod',
  // not much test magic here yet. Will soon setup some Postman integration tests Check the property for instructions!
  // testCommands: (stageAccount) => [
  //   `echo "${stageAccount.stage} stage"`,
  //   'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" $bucketWebsiteUrl)',
  //   'echo Statuscode = $STATUSCODE',
  //   'if test $STATUSCODE -e 200; then exit 1; fi',
  //   //
  //   `echo "${stageAccount.stage} stage"`,
  //   'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" --data \'{"query":"xyz","X-Api-Key":"$appsyncEndpointOutput"}\' $appsyncEndpointOutput)',
  //   'echo Statuscode = $STATUSCODE',
  //   'if test $STATUSCODE -e 401; then exit 1; fi',
  // ],
  gitHub: {
    owner: 'hacking-akademie',
    oauthToken: cdk.SecretValue.secretsManager('gitToken', {
      jsonField: 'github-token',
    }),
  },
});

app.synth();