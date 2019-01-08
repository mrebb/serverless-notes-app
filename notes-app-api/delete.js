import * as DynamoDbLib from './libs/dynamodb-lib'
import {success, failure} from './libs/response-lib'

export async function main(event,context) {
    const params ={
        TableName:"notes",
        Key:{
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }

    }

    try{
        const result = await DynamoDbLib.call('delete',params)
        return success({status:true})
    }
    catch(e){
        console.log('error',e)
        return failure({status:false})
    }
}