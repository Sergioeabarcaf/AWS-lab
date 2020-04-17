var aws = require('aws-sdk');
var fs = require('fs');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'tgr-ats_dev_Project';

async function putData(data) {
    let params = {
        TableName: tableName,
        Item: {
            projectID: data.projectID,
            projectDescription: data.projectDescription,
            available: data.available,
            projectName: data.projectName
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
            for( let project of dataJSON.Items){
                putData(project);
            }
        }
    });
}

restoreItem();  