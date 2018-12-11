'use strict'

const dialogflow = require("dialogflow");
const config = require("../config/keys");
const structjson = require("./structjson");
const mongoose = require("mongoose");

const projectID = config.googleProjectID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionID = config.dialogflowFlowSession;
const LanguageCode = config.LanguageCode;

const sessionClient = new dialogflow.SessionsClient({projectID, credentials});



const register = mongoose.model('register');

module.exports = {
    textQuery: async function(text,userID, parameters= {}) {
        console.log(text);
        let session = sessionClient.sessionPath(projectID, sessionID+ userID);
        let self = module.exports;
        const request = {
            session: session,
            queryInput: {
              text: {
                text: text,
                languageCode: LanguageCode
              },
            },
            queryParams: {
                payload:{
                    data:parameters
                }
            }
          };
    
        
        let responses = await sessionClient
          .detectIntent(request);
        
        responses = await self.handleAction(responses);
        return responses;
    },


    eventQuery: async function(event,userID, parameters= {}) {
        console.log(event);
        let session = sessionClient.sessionPath(projectID, sessionID+ userID);
        let self = module.exports;
        const request = {
            session: session,
            queryInput: {
              event: {
                name: event,
                parameters: structjson.jsonToStructProto(parameters),
                languageCode: config.LanguageCode
              }
            }
          };
    
        
        let responses = await sessionClient
          .detectIntent(request);
        
        responses = await self.handleAction(responses);
        return responses;
    },


    handleAction: function(responses) {

      let queryResult = responses[0].queryResult;
      switch (queryResult.action) {
         case 'saving-data':
             if (queryResult.allRequiredParamsPresent) {
               self.saveRegisteration(queryResult.parameters.fields)
              }
             break;
     }
     // console.log(queryResult.action);
     // console.log(queryResult.allRequiredParamsPresent);
     // console.log(queryResult.fulfillmentMessages);
     // console.log(queryResult.parameters.fields);
     
        return responses;
    },

    saveRegisteration: async function(fields) {
      const register = new register({
        name: fields.name.stringValue,
        email: fields.email.stringValue
      });
      try{

        let reg = await register.save();
      }catch(error){
        console.log(error);
      }

    }
}