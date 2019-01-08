import * as DynamoDbLib from './libs/dynamodb-lib'
import { success, failure} from './libs/response-lib'

export async function main(event,context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
    }

    try{
        const result = await DynamoDbLib.call('update',params)
        return success({status: true})

    }
    
    catch(e){
        return failure({status:false})
    }
}