var express=require('express');
var app= express();
var bodyParser= require('body-parser');
var serverPort=process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/*
var apiai= require('apiai');
var appToken=require('02a17470d88041c999f781053ec74d70');
var request = appToken.textRequest('Hi', {
    sessionId: 'my'
});
request.on('response', function(response) {
    console.log(response);
});
 
request.on('error', function(error) {
    console.log(error);
});*/
request.end();
app.post('/',function(req,res){
console.log(req.body.result);
});
app.listen(serverPort, function(){
    console.log('AI agent running on: ' + serverPort);
});