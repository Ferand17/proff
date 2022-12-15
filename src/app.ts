import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from "aws-sdk";

const docClient = new DynamoDB.DocumentClient()
const tableName = "ecoproducts";
const headers = {
    "content-type": "application/json",
};

export const state: APIGatewayProxyHandler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ hello: "hola como estas" }),
    }
}


export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const reqBody = await JSON.parse(event.body as string);

        await docClient
            .put({
                TableName: tableName,
                Item: reqBody,
            })
            .promise();


        return {
            statusCode: 201,
            headers,
            body: JSON.stringify(reqBody),
        };
    } catch (e) {
        return e;
    }
};


export const getseed = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const product = await docClient.scan({
            TableName: tableName,
        }).promise()
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(product),
        };
    } catch (e) {
        return e;
    }
};

export const updateProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const reqBody = await JSON.parse(event.body as string);

        await docClient
            .put({
                TableName: tableName,
                Item: reqBody,
            })
            .promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(reqBody),
        };
    } catch (e) {
        return e;
    }
};

export const deleteProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const reqBody = await JSON.parse(event.body as string)

        await docClient
            .delete({
                TableName: tableName,
                Key: reqBody,
            })
            .promise();

        return {
            statusCode: 204,
            body: "eliminado",
        };
    } catch (e) {
        return e;
    }
};