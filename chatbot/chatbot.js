'use strict'

const dialogflow = require("dialogflow");
const config = require("../config/keys");
const structjson = require("./structjson");

const projectID = config.googleProjectID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionID = config.dialogflowFlowSession;
const LanguageCode = config.LanguageCode;

const sessionClient = new dialogflow.SessionsClient({projectID, credentials});

const session = sessionClient.sessionPath(projectID, sessionID);



module.exports = {
    textQuery: async function(text, parameters= {}) {
        console.log(text);
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


    eventQuery: async function(event, parameters= {}) {
        console.log(event);
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
        return responses;
    }
}