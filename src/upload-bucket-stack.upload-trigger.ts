export async function handler(event: any) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  console.debug('Got an Invoke Request.');
};