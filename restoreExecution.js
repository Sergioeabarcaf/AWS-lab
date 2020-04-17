var aws = require('aws-sdk');
var fs = require('fs');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'tgr-ats_dev_Execution';

async function putData(data) {
    let params = {
        TableName: tableName,
        Item: {
            responsable: data.responsable,
            timestampStart: data.timestampStart,
            executionID: data.executionID,
            useCaseID: data.useCaseID
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