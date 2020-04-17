var aws = require('aws-sdk');
var fs = require('fs');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'tgr-ats_dev_Project';

scanData = () => {
    let paramsScan = {
        TableName: tableName,
    }
    
    dynamoDBClient.scan(paramsScan, (err, data) => {
        if( err ){
            console.error( err );
        }
        console.log(data);
        writeFile(JSON.stringify(data));
    });

};

writeFile = (data) => {
    fs.appendFile(`${tableName}.txt`, data, (err) => {
        if(err){
            console.log(err);
        }

        console.log("Obtencion correcta de archivos.")
    })
}

scanData();
