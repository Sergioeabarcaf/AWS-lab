var AWS = require('aws-sdk');
var Lambda = new AWS.Lambda({region: "us-east-1"});

Lambda.invoke({
    FunctionName: "tgr-automated-test-suite-dev-ap-DisableApplication-C7SFHSTR82XH",
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({"id": 1588013574606})
}, (err, data) => {
    if(err){
        console.log(err);
    }

    console.log(data);
});
