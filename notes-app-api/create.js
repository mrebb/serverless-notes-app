import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
//   dynamoDb.put(params, (error, data) => {
//     // Set response headers to enable CORS (Cross-Origin Resource Sharing)
//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Credentials": true
//     };

//     // Return status code 500 on error
//     if (error) {
//       const response = {
//         statusCode: 500,
//         headers: headers,
//         body: JSON.stringify({ status: false })
//       };
//       callback(null, response);
//       return;
//     }

//     // Return status code 200 and the newly created item
//     const response = {
//       statusCode: 200,
//       headers: headers,
//       body: JSON.stringify(params.Item)
//     };
//     callback(null, response);
//   });
// }