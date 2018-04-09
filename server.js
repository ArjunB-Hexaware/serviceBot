var express=require('express');
var app= express();
var bodyParser= require('body-parser');
var Client = require('node-rest-client').Client;
var options_auth = { user: "33238", password: "abc123" };
var client = new Client(options_auth);
var serverPort=process.env.PORT || 3000;
var fbBot= require('./facebook-bot.js');
var slBot= require('./slack-bot.js');
var gAsstBot= require('./gAsst-bot');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.post('/',function(req,res){
   /* Creating a service request */
   console.log(req.body.originalRequest.source);
 if(req.body.originalRequest.source == 'facebook'){
  fbBot.fbWebHookResponse(req,res);
}else{
  if(req.body.originalRequest.source == 'slack_testbot'){
    slBot.slackWebHookResponse(req,res);
  }else{
    if(req.body.originalRequest.source == 'google'){
      console.log("Google assistant");
      gAsstBot.googleAsstWebHookResponse(req,res);
    }
  }
}
});


app.listen(serverPort, function(){
    console.log('AI agent running on: ' + serverPort);
});