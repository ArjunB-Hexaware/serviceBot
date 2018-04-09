
var Client = require('node-rest-client').Client;
var options_auth = { user: "33238", password: "abc123" };
var client = new Client(options_auth);

exports.slackWebHookResponse = function(req,res){

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
        /*
        return res.json({
        speech:"Your service now request created successfully. Your Incident number is :  "+data.result.number,
        displayText:"Your service now request created successfully. Your Incident number is :  "+data.result.number
                   });*/
          
          return res.json({
          "messages": [
        {
        "buttons": [
          {
            "postback": "",
            "text":data.result.number+" status"
          },{
            "postback": "",
            "text": "Create new incident"
          },{
            "postback": "",
            "text": "Incident status "
          }
        ],
        "imageUrl": "http://allvectorlogo.com/img/2016/04/servicenow-logo.png",
        "platform": "slack",
        "subtitle": "Choose any one of the following to continue",
        "title": "Your request has been created successfully.Incident number is :  "+data.result.number,
        "type": 1
        }
        ]
          })
                
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
            console.log("incident status"+req.body.result.parameters.incidentNumber);
            if(req.body.result.parameters.incidentNumber)
        {
          var incidentNumber=req.body.result.parameters.incidentNumber;
          incidentNumber=incidentNumber.substring(0,3);
          if(incidentNumber.toLowerCase() != "inc" ){
          return res.json({
          speech:"Please enter a valid incident number.",
            displayText:"Please enter a valid incident number."
          })
          }else{
             incidentNumber=req.body.result.parameters.incidentNumber;
            incidentNumber=incidentNumber.substring(3,req.body.result.parameters.incidentNumber.length);
          if(isNaN(incidentNumber)){
              return res.json({
          speech:"Please enter a valid incident number",
            displayText:"Please enter a valid incident number"
          })
          }
          }
            var args = {
        
        headers: { "Content-Type": "application/json" }
        };
          console.log("Incident number"+req.body.result.parameters.incidentNumber);
        var request=client.get("https://dev18442.service-now.com/api/now/table/incident?number="+req.body.result.parameters.incidentNumber,args,  function (data, response) {
        // parsed response body as js object 
        
        // raw response 
        
        if(!data.error)
        {
        if(data.result[0])
        {
        /*
        return res.json({
        speech:" Incident Number : "+data.result[0].number +"- Incident description : "+data.result[0].short_description+" - Created on : "+getProperDateFormat(data.result[0].opened_at),
        displayText:"Incident Number : "+data.result[0].number +"- Incident description : "+data.result[0].short_description+" - Created on : "+getProperDateFormat(data.result[0].opened_at)
        })*/
        return res.json({
            "messages": [   {"type":0,
            "platform":"slack",
            speech:" Incident Number : "+data.result[0].number +"- Incident description : "+data.result[0].short_description+" - Created on : "+getProperDateFormat(data.result[0].opened_at)+" - Status:Open",
            displayText:"Incident Number : "+data.result[0].number +"- Incident description : "+data.result[0].short_description+" - Created on : "+getProperDateFormat(data.result[0].opened_at)+" - Status:Open",
        },{
                  "platform": "slack",
                  "replies": [
                    "Create incident",
                    "Incident status"
                  ],
                  "title": "Please choose one of the following to continue",
                  "type": 2
                }
              ]
              })
        }
        else
        {
        return res.json({
        speech:"Incident number does not exist. Please enter another incident number",
        displayText:"Incident number does not exist.Please enter another incident number"
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
       /* return res.json({
            "messages": [
                {
                  "platform": "slack",
                  "replies": [
                    "High",
                    "Medium",
                    "Low"
                  ],
                  "title": "Please state your priority",
                  "type": 2
                }
              ]
              });*/
           return res.json({
            "platform":"slack",
            "speech":"Please priority",
            "displayText": "priority",
                "attachments": [
                    {
                        "text": "Choose a game to play",
                        "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "callback_id": "game_selection",
                        "actions": [
                            {
                                "name": "games_list",
                                "text": "Pick a game...",
                                "type": "select",
                                "options": [
                                    {
                                        "text": "Hearts",
                                        "value": "hearts"
                                    },
                                    {
                                        "text": "Bridge",
                                        "value": "bridge"
                                    },
                                    {
                                        "text": "Checkers",
                                        "value": "checkers"
                                    },
                                    {
                                        "text": "Chess",
                                        "value": "chess"
                                    },
                                    {
                                        "text": "Poker",
                                        "value": "poker"
                                    },
                                    {
                                        "text": "Falken's Maze",
                                        "value": "maze"
                                    },
                                    {
                                        "text": "Global Thermonuclear War",
                                        "value": "war"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        }else{
            if(req.body.result.metadata.intentName =='serviceNowGetDetails'){
                console.log("servicenowgetdetails");
                console.log(JSON.stringify(req.body.result.parameters));
                console.log(req.body.result.parameters.empid);
                if(req.body.result.parameters.empid.length>3 && req.body.result.parameters.empid.length<7){
                    res.json({
                        "messages": [{"type":0,
                        "platform":"slack",
                        "speech":"Please select the type of incident",
                        "displayText": "Please select the type of incident"},
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
                              "imageUrl": "https://envecon.com/wp-content/uploads/2016/09/Application_Support-1030x391.png",
                              "platform": "slack",
                              "subtitle": "Select an incident type",
                              "title": "Application Support",
                              "type": 1
                            },  {
                                "buttons": [
                                  {
                                    "postback": "",
                                    "text": "Food coupons"
                                  },
                                  {
                                      "postback": "",
                                      "text": "Group mediclaim insurance"
                                    },
                                    {
                                      "postback": "",
                                      "text": "Other queries"
                                    }
                                ],
                                "imageUrl": "http://www.peoplefirsthrsolutions.com/files/5814/3101/7655/hr-support.jpg",
                                "platform": "slack",
                                "subtitle": "Select an incident type",
                                "title": "Human Resource",
                                "type": 1
                              }, {
                                "buttons": [
                                  {
                                    "postback": "",
                                    "text": "Payroll"
                                  },
                                  {
                                      "postback": "",
                                      "text": "Travel and expenses"
                                    },
                                    {
                                      "postback": "",
                                      "text": "Expense claims"
                                    }
                                ],
                                "imageUrl": "http://www.perlavision.cu/wp-content/uploads/2015/12/pago-impuestos-tributos-cuba-300x200.jpg",
                                "platform": "slack",
                                "subtitle": "Select an incident type",
                                "title": "Finance",
                                "type": 1
                              },
                          {
                             speech:"Enter incident type",
                    displayText: "Enter incident type"
                          }
                          ]
                    })
                }else{
                   return res.json({
                    speech:"Please enter valid employee Id",
                    displayText: "Please enter valid employee Id"
                 
                    })
                }
            }
        }
        }
        }
};
var getProperDateFormat=function(dateValue){
    dateValue=dateValue.substring(0,10);
    dateValue=dateValue.split("-");
    return dateValue[2]+"/"+dateValue[1]+"/"+dateValue[0];
    
    };