import '@aws-cdk/assert/jest';
import * as lambda from 'aws-lambda';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import * as AWS from '../__mocks__/aws-sdk';
// import { handler } from '../src/upload-bucket-stack.upload-trigger';

test('Parse S3 data', async () => {
  s3Data;

  const mockResult: GetSecretValueResponse = {
    SecretString: '',
  };
  AWS.getSecretValueResponse.mockReturnValueOnce(mockResult);

  // mock ssh


  // await handler(s3Data);

  // expect(stack).not.toHaveResource('AWS::S3::Bucket');
  // expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});

const s3Data: lambda.S3CreateEvent = {
  Records: [
    {
      eventVersion: '2.1',
      eventSource: 'aws:s3',
      awsRegion: 'eu-central-1',
      eventTime: '2021-08-02T05:35:17.349Z',
      eventName: 'ObjectCreated:CompleteMultipartUpload',
      userIdentity: {
        principalId: 'AWS:AROA46P6WAP7Y6MD5BEXH:martin',
      },
      requestParameters: {
        sourceIPAddress: '95.90.248.47',
      },
      responseElements: {
        'x-amz-request-id': '34Z1YCHMAE0QAWEG',
        'x-amz-id-2': 'hODGU4YdIkkYQACmCVpi6j86PDOcbGXLpSHsCd1ZPbQYEQDv1I+Z70fLe7CKAgdRLAsjP+D2cnDpIFCR8Zgqq8u/QhKIXU48',
      },
      s3: {
        s3SchemaVersion: '1.0',
        configurationId: 'YzZmN2UwMzAtNDVkNy00YzI0LTkxZDQtNmY1M2Y2MmU5ZmJi',
        bucket: {
          name: 'hacklab-videos',
          ownerIdentity: {
            principalId: 'ALL6NQQ0OOINL',
          },
          arn: 'arn:aws:s3:::hacklab-videos',
        },
        object: {
          key: '001_kategorie1_Das-ist-die-erste-Lektion.mp4',
          size: 27822101,
          eTag: 'f147796fb7b42a5382edb4db21c648a5-2',
          sequencer: '006107840F0AEA9D3E',
        },
      },
    },
  ],
};