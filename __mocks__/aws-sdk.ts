import * as AWS from 'aws-sdk';

export const describeInstancesResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const describeInstancesFn = jest.fn().mockImplementation(() => ({ promise: describeInstancesResponse }));

export class EC2 {

  public describeInstances: jest.Mock<any, any>;

  constructor() {
    this.describeInstances = describeInstancesFn;
  }
}

export const putMetricDataResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const putMetricDataFn = jest.fn().mockImplementation(() => ({ promise: putMetricDataResponse }));
export class CloudWatch {

  public putMetricData: jest.Mock<any, any>;

  constructor() {
    this.putMetricData = putMetricDataFn;
  }
}

export const getSecretValueResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const getSecretValueFn = jest.fn().mockImplementation(() => ({ promise: getSecretValueResponse }));
export class SecretsManager {

  public getSecretValue: jest.Mock<any, any>;

  constructor() {
    this.getSecretValue = getSecretValueFn;
  }
}

export const createStackResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const createStackFn = jest.fn().mockImplementation(() => ({ promise: createStackResponse }));
export const updateStackResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const updateStackFn = jest.fn().mockImplementation(() => ({ promise: updateStackResponse }));
export const waitForResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const waitForFn = jest.fn().mockImplementation(() => ({ promise: waitForResponse }));
export const deleteStackResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const deleteStackFn = jest.fn().mockImplementation(() => ({ promise: deleteStackResponse }));
export class CloudFormation {

  public createStack: jest.Mock<any, any>;
  public updateStack: jest.Mock<any, any>;
  public waitFor: jest.Mock<any, any>;
  public deleteStack: jest.Mock<any, any>;

  constructor() {
    this.createStack = createStackFn;
    this.updateStack = updateStackFn;
    this.waitFor = waitForFn;
    this.deleteStack = deleteStackFn;
  }
}

export class DynamoDB extends AWS.DynamoDB {

}