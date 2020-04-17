var aws = require('aws-sdk');
var fs = require('fs');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'tgr-ats_dev_Use-Case';

async function putData(data) {
    let params = {
        TableName: tableName,
        Item: {
            useCaseName: data.useCaseName,
            projectID: data.projectID,
            available: data.available,
            updateTime: data.updateTime,
            updateBy: data.updateBy,
            createdTime: data.createdTime,
            createdBy: data.createdBy,
            useCaseID: data.useCaseID,
            useCaseDescription: data.useCaseDescription,
            useCaseCode: data.useCaseCode
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
            for( let useCase of dataJSON.Items){
                putData(useCase);
            }
        }
    });
}

restoreItem();  