'use strict';
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

async function getrestaurants(count) {
    let req = {
        TableName: tableName,
        Limit: count
    };
    let resp = await dynamodb.scan(req).promise()
    return resp.Items;
}

module.exports.handler = async (event, context) => {
    let restaurants = await getrestaurants(defaultResults);
    const response = {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }
    return response
}

