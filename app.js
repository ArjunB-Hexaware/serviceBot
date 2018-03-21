
'use strict';
var apiai = require('apiai');

var appai = apiai("baf498c6d40a4a70b54ef80debdcbc33");

var express=require('express');
var bodyParser = require('body-parser');
var app = express();
var portC = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var options = {
    sessionId: '567yh8'
};

/*var request = appai.textRequest('Hello', options);

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();*/

/*app.post('/Default Welcome Intent',function(req,res){
  var apiagentreq=req.body.result&&req.body.result.parameters;
  var resagent='hello welcome to TICKET BOOK chat bot';
console.log('request are'+apiagentreq);
  return res.json({
    speech:resagent,
    displayText: resagent,
    source:'hello ticket book'
  });
});*/


/*app.post('/Default Welcome Intent',function(req,res){
   console.log('REQUESTTTTT:::'+JSON.stringify(req.body));
var resagent="**WELCOME TO TICKET BOOK**, would you like to book tickets..";
   return res.json({
     speech:resagent,
     displayText: resagent,
     source:'hello ticket book'
   });
 });*/

   app.post('/',function(req,res){
      console.log('REQUESTTTTT:::'+JSON.stringify(req.body));
if(req.body.result.metadata.intentName=='ticketbook'){
      if(req.body.result.parameters.location1){
        var resagent="Sure, will check for tkts from " + req.body.result.parameters.location+ " to "+
        req.body.result.parameters.location1+
        "   for "+ req.body.result.parameters.date +"   How would you like to travel?by flight,train or bus.....";
      }else{
   var resagent="Alright, will check for tkts to " + req.body.result.parameters.location+
   "   for"+ req.body.result.parameters.date +"   How would you like to travel?by flight,train or bus.....";
 }
      return res.json({
        speech:resagent,
        displayText: resagent,
        source:'hello ticket book'
      });



}else if (req.body.result.metadata.intentName=='Default Welcome Intent'){
  var apiagentreq=req.body.result&&req.body.result.parameters;
  var resagent='hello Welcome...would you like to book tickets?';
console.log('request are'+apiagentreq);
  return res.json({
    speech:resagent,
    displayText: resagent,
    source:'hello ticket book'
  });

}
else{
  return res.json({
    speech:'HEY Sorry, cannot determine',
    displayText:'HEY Sorry, we cant get you'
  })
}

});



app.listen(portC, function(){
    console.log('AGENT is running my app on  PORT: ' + portC);
});
