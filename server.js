var express=require('express');
var app= express();
var bodyParser= require('body-parser');
var Client = require('node-rest-client').Client;
var options_auth = { user: "33238", password: "abc123" };
var client = new Client(options_auth);
var serverPort=process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/',function(req,res){
    /* Creating a service request */
    if(req.body.result.metadata.intentName=='ServiceNowStoreData'){ 

    try
	{
console.log("describe"+req.body.result.contexts[0].parameters.IncidentDescription);

var args = {
    data: {'short_description':req.body.result.contexts[0].parameters.IncidentDescription,'assignment_group':'287ebd7da9fe198100f92cc8d1d2154e','urgency':'2','impact':'2'} ,
    headers: { "Content-Type": "application/json" }
};
 
 var request=client.post("https://dev18442.service-now.com/api/now/table/incident", args, function (data, response) {
	 
    // parsed response body as js object 
    console.log(data);
    // raw response 
   if(!data.error)
	{
	
return res.json({
    speech:"Your service now request created successfully. Your Incident number is :  "+data.result.number,
    displayText:"Your service now request created successfully. Your Incident number is :  "+data.result.number
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
    speech:" Incident Number : "+data.result[0].number +"- Incident description : "+data.result[0].short_description+" - Created on : "+getProperDateFormat(data.result[0].opened_at),
    displayText:"Incident Number : "+data.result[0].number +"- Incident description : "+data.result[0].short_description+" - Created on : "+getProperDateFormat(data.result[0].opened_at)
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
}else{
    if(req.body.result.metadata.intentName=='serviceNowGenerateId'){
        console.log("Incident priority check condition");
    return res.json({
        "messages": [
            {
              "platform": "facebook",
              "replies": [
                "High",
                "Medium",
                "Low"
              ],
              "title": "Please state your priority",
              "type": 2
            }
          ]
          });
    }else{
        if(req.body.result.metadata.intentName =='serviceNowGetDetails'){
            if(req.body.result.parameters.empid.length>3 && req.body.result.parameters.empid.length<7){
                res.json({
                    "messages": [
                        {
                          "buttons": [
                            {
                              "postback": "",
                              "text": "Gadget Issue"
                            },
                            {
                                "postback": "",
                                "text": "Server Down"
                              },
                              {
                                "postback": "",
                                "text": "Website Access"
                              }
                          ],
                          "imageUrl": "http://allvectorlogo.com/img/2016/04/servicenow-logo.png",
                          "platform": "facebook",
                          "subtitle": "",
                          "title": "Select the type of incident",
                          "type": 1
                        }
                      ]
                })
            }else{
               return res.json({
                speech:"The ID you have entered is invalid. Its size must be from 4-6 digits only",
                displayText: "The ID you have entered is invalid. Its size must be from 4-6 digits only"
                })
            }
        }
    }
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