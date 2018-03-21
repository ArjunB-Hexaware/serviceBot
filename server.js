var express=require('express');
var app= express();
var bodyParser= require('body-parser');
var Client = require('node-rest-client').Client;
var options_auth = { user: "33238", password: "abc123" };
var client = new Client(options_auth);
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
});
request.end();*/
app.post('/',function(req,res){
    if(req.body.result.metadata.intentName=='serviceNowGenerateId'){
        res.json({
            speech:"Service request with Incident number "+req.body.result.parameters.IncidentDescription+" has been created successfully",
            displayText:"Service request with Incident number "+req.body.result.parameters.IncidentDescription+" has been created successfully"
                       });
    try
	{
var args = {
    data: {'short_description':req.body.result.parameters.IncidentDescription,'assignment_group':'287ebd7da9fe198100f92cc8d1d2154e','urgency':'2','impact':'2'} ,
    headers: { "Content-Type": "application/json" }
};
 
 var request=client.post("https://dev18442.service-now.com/api/now/table/incident", args, function (data, response) {
	 
    // parsed response body as js object 
    console.log(data);
    // raw response 
   if(!data.error)
	{
	
return res.json({
    speech:"Service request with Incident number "+data.result.number+" has been created successfully",
    displayText:"Service request with Incident number "+data.result.number+" has been created successfully"
               });
			
	}
	else
	{
		 return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
	}

}); 
	
	
request.on('requestTimeout', function (req) {
    console.log('request has expired');
    req.abort();
	return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
});
 
request.on('responseTimeout', function (res) {
    console.log('response has expired');
 return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
});
 
//it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts 
request.on('error', function (err) {
    console.log('request error', err);
	return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
});
	
	}
	catch(ex)
	{
		console.log(ex);
		return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
    }
}else{
if(req.body.result.metadata.intentName=='serviceNowGetIncidentStatus'){
    try
	{
		if(req.body.result.parameters.incidentNumber)
	{
		var args = {
   
    headers: { "Content-Type": "application/json" }
};
var request=client.get("https://dev18442.service-now.com/api/now/table/incident?number="+req.body.result.parameters.incidentNumber,args,  function (data, response) {
    // parsed response body as js object 
    
    // raw response 
	console.log("Data:::"+data.result[0]);
	console.log("Response:"+response);
	if(!data.error)
	{
	if(data.result[0])
	{
	
	return res.json({
    speech:"Get Status Successfull for incident "+data.result[0].number +"-"+data.result[0].short_description,
    displayText:"Get Status Successfull for incident "+data.result[0].number +"-"+data.result[0].short_description
  })
	}
	else
	{
	return res.json({
    speech:"Please enter valid incident number",
    displayText:"Please enter valid incident number"
  })
	}
	}
	else
	{
		return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
	}

}); 
	request.on('requestTimeout', function (req) {
    console.log('request has expired');
    req.abort();
	return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
});
 
request.on('responseTimeout', function (res) {
    console.log('response has expired');
	return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
 
});
 
//it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts 
request.on('error', function (err) {
    console.log('request error', err);
	return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
});	
		
	}	

	}
catch(ex)
	{
	console.log(ex);	
		return res.json({
        speech:"something went wrong on the request",
        displayText: "something went wrong on the request"
       
      });
	}
}
}
});
app.listen(serverPort, function(){
    console.log('AI agent running on: ' + serverPort);
});