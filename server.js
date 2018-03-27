var express=require('express');
var app= express();
var bodyParser= require('body-parser');
var Client = require('node-rest-client').Client;
var options_auth = { user: "33238", password: "abc123" };
var client = new Client(options_auth);
var serverPort=process.env.PORT || 3000;
var fbBot= require('./facebook-bot.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.post('/',function(req,res){
   /* Creating a service request */
 if(req.body.originalRequest.source == 'facebook'){
  fbBot.fbWebHookResponse(req,res);
}else{
  if(req.body.originalRequest.source == 'slack'){

  }
}
});

var getProperDateFormat=function(dateValue){
dateValue=dateValue.substring(0,10);
dateValue=dateValue.split("-");
return dateValue[2]+"/"+dateValue[1]+"/"+dateValue[0];

};
app.listen(serverPort, function(){
    console.log('AI agent running on: ' + serverPort);
});