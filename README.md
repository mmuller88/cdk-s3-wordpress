# upload-bucket-stack

# Setup Projen
Setup the alias as described here: https://github.com/projen/projen

```
alias pj='npx projen'
```

# Setting up the Pipeline
In this section I describe how to setup the Pipeline.
## AWS Secrets Manager
The Pipeline itself lives in the build account. First we need to create a GitHub Token () and store the Token in AWS Secrets Manager. We need todo that so that the pipeline can act as a webhook when new pull requests are detected. In **main.ts** we load the Token here:

```ts
gitHub: {
    owner: 'hacking-akademie',
    oauthToken: core.SecretValue.secretsManager('gitToken', {
      jsonField: 'github-token',
    }),
  },
```
So lets setup this secret! Go to AWS Secrets Manager --> Other type of secrets --> github-token = GITHUB_TOKEN

I used my personal GitHub Account for the token! In the future we could use a dedicated Machine User for the token.

## CDK Bootstrap
The bootstrap installs some AWS Helper resources to convincly install CDK Stack even cross account.

Run `pj` (see section Setup Projen)

### Bootstrap build

```bash
node_modules/.bin/cdk bootstrap --trust 890129220607,681044435084 --force --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://429736546496/eu-central-1 --profile build
```

### Bootstrap dev

```bash
node_modules/.bin/cdk bootstrap --trust 429736546496 --force --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://890129220607/eu-central-1 --profile dev
```

### Bootstrap prod

```bash
node_modules/.bin/cdk bootstrap --trust 429736546496 --force --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://681044435084/eu-central-1 --profile prod
```

## Deploy Pipeline

And now run:
```
yes | yarn cdkDestroy 'UploadBucketStack-pipeline' --profile build && yarn cdkDeploy 'UploadBucketStack-pipeline' --require-approval never --profile build
```

Notice: Normally you don't need to redeploy the pipeline as it picks up changes on the **main** branch itself. Only if you do changes to the pipeline itself you might need to redeploy it. Like it doesn't seem to get changes in the buildspec codebuild project.

# Wordpress

## Create Post
https://developer.wordpress.org/cli/commands/post/create/

```
wp post create

wp post create --post_title='A post' --post_content='Just a small post.' --meta_input='{"key1":"value1","key2":"value2"}'
Success: Created post 1922.
```