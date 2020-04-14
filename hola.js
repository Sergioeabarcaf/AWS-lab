var aws = require('aws-sdk');

const dynamoDBClient = new aws.DynamoDB.DocumentClient({region: "us-east-1"});
const tableName = 'SA_tgr-ats_dev_Use-Case';

function getDataQuery(id) {
    let paramsQuery = {
        TableName: tableName,
        IndexName: "id_project",
        KeyConditionExpression: "projectID = :projectID and available = :show",
        ExpressionAttributeValues: {
        ":projectID": id,
        ":show": "true"
        }
    }

    dynamoDBClient.query(paramsQuery, (err, data) => {
        if(err){
            console.log(err);
            return false
        }

        console.log(data);
        return true
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
            "id": id,
            "featureID": id
        },
        UpdateExpression: "set proyecto = :proyecto, nombre = :nombre, descripcion = :descripcion, responsable = :responsable, urlS3 = :urlS3, estado = :estado",
        ExpressionAttributeValues:{
            ":proyecto": "newProject", 
            ":nombre": "nameCompany", 
            ":descripcion": "testing", 
            ":responsable": "Oliver Prada", 
            ":urlS3": "www.algoenS3.com", 
            ":estado": "Ejecutando"
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

// putData();
// getData(1585682453203);
// getDataRange();
// scanData();
// deleteData(1585571284161);
// updateData(1585573508119)
getDataQuery(123);
