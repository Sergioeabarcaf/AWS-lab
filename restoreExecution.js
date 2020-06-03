var aws = require('aws-sdk');
var fs = require('fs');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'tgr-ats_dev_Execution';

async function putData(data) {
    let params = {
        TableName: tableName,
        Item: {
            resultExecution: data.resultExecution ? JSON.stringify(data.resultExecution) : '-',
            timestampStart: data.timestampStart,
            executionID: data.executionID,
            testCaseID: data.testCaseID ? Number(data.testCaseID) : 1,
            createdBy: data.createdBy ? JSON.stringify(data.createdBy) : '-',
            tags: data.tags ? JSON.stringify(data.tags) : '[]',
            timestampEnd: data.timestampEnd ? Number(data.timestampEnd) : 2,
            applicationID: data.applicationID ? Number(data.applicationID) : 3,
            state: data.state ? JSON.stringify(data.state) : '-',
            available: 'true'
        }
    };

    await dynamoDBClient.put(params, (err, data) => {
        if( err ) console.error(err);

        console.log(data);
    });
    console.log("ya se hizo el put");
};

restoreItem = () => {
    fs.readFile(`${tableName}.txt`, 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
        }

        if(data) {
            const dataJSON = JSON.parse(data);
            for( let execution of dataJSON.Items){
                putData(execution);
            }
        }
    });
}

restoreItem();  