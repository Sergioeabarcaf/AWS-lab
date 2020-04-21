var aws = require('aws-sdk');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'SA-testLabs';

function getDataQuery(id, key) {
    let paramsQuery = {
        TableName: tableName,
        IndexName: "id_project",
        KeyConditionExpression: "projectID = :projectID and available = :show",
        ExpressionAttributeValues: {
        ":projectID": id,
        ":show": "true"
        },
        Limit: 4
    };
    if(key){
        paramsQuery.ExclusiveStartKey = key
    }

    dynamoDBClient.query(paramsQuery, (err, data) => {
        if(err){
            console.log(err);
            return false
        }

        if(!data.LastEvaluatedKey){
            return true;
        }

        console.log(data);
        return getDataQuery(id, data.LastEvaluatedKey);
    });
}

function getDataID(id) {
    let paramsQuery = {
        TableName: tableName,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
        ":id": id,
        }
    }

    dynamoDBClient.query(paramsQuery, (err, data) => {
        if(err){
            console.log(err);
            return false
        }

        console.log(data);
        return true;
    });
}

// Put Data 
async function putData() {

    let params = {
        TableName: tableName,
        Item: {
            "id": new Date().getTime(),
            "featureID": new Date().getTime(),
            "proyecto": 'Proyecto',
            "nombre": 'Nombre',
            "descripcion": 'Descripcion',
            "responsable": 'Responsable',
            "urlS3": 'Url',
            "estado": "nuevo"
        }
    };

    await dynamoDBClient.put(params, (err, data) => {
        if( err ) console.error(err);

        console.log(data);
    });
    console.log("ya se hizo el put");
};

// Get one Data with keys 
async function getData(id) {
    let paramsGet = {
        TableName: tableName,
        Key: {
            "id": id,
            "featureID": id
        }
    };

    await dynamoDBClient.get(paramsGet, (err, data) => {
        if( err ){
            console.error(err);
            return err;
        }
        if (data.Item) {
            console.log(`No existen datos asociados al id: ${id}`);
            return false;
        }

        console.log(data);
        return true;
    });
};

// Get data in range with keys
async function getDataRange(){

    let paramsRange = {
        TableName: tableName,
        ProjectionExpression: "#id, descripcion, nombre",
        FilterExpression: "#id between :idStart and :idEnd",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":idStart": 1585581971764,
            ":idEnd": 1585616347722
        }
    };

    await dynamoDBClient.scan(paramsRange, (err, data) => {
        if( err ) console.error(err);

        console.log(data);

    });
};

// Get all data in table
function scanData(){
    let paramsScan = {
        TableName: tableName,
    }
    
    dynamoDBClient.scan(paramsScan, (err, data) => {
        if( err ) console.error( err );

        console.log(data);
    });

};

// Delete data for id in table
function deleteData(id){
    let paramsDelete = {
        TableName: tableName,
        Key: {
            "id": id,
            "featureID": id
        }
    };
    
    dynamoDBClient.delete(paramsDelete, (err, data) => {
        if( err ){
            console.error( err );
            return false;
        }

        if(data){
            console.log(`Los datos asociados al id: ${id} no han sido borrados correctamente.`);
            return false;
        }

        console.log(`Los datos asociados al id: ${id} fueron borrados correctamente.`);
        return true;
    });

};

// Update data for id in table
function updateData(id){
    let paramsUpdate = {
        TableName: tableName,
        Key: {
            "id": id
        },
        UpdateExpression: "set responsable = :responsable, descripcion = :descripcion",
        ExpressionAttributeValues:{
            ":descripcion": "testing", 
            ":responsable": "SergioAbarcaFlores"
        },
        ReturnValues:"UPDATED_NEW"
    };

    dynamoDBClient.update(paramsUpdate, (err, data) => {
        if( err ){
            console.error( err );
            return false;   
        }

        console.log(data.Attributes);
        return true;
    });
};

function createData(){
    let paramsCreate = {
        TableName: tableName,
        Item: {
            "id": new Date().getTime(),
            "responsable": 'sergioAbarca_',
            "descripcion": 'Holhoaoaoalkla'
        }
    };

    dynamoDBClient.put(paramsCreate, (err, data) => {
        if( err ){
            console.error( err );
            return false;   
        }

        console.log(data);
        return true;
    });


}


// putData();
// getData(1585682453203);
// getDataRange();
// scanData();
// deleteData(1585571284161);
// updateData(1587141553860)
// getDataQuery(1586887842668);
getDataID(1587141553860);
// createData();
