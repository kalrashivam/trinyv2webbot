'use strict'

const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionClient = new dialogflow.SessionsClient();

const session = sessionClient.sessionPath(config.googleProjectID, config.dialogflowFlowSession);



module.exports = {
    textQuery: async function(text, parameters= {}) {
        console.log(text);
        let self = module.exports;
        const request = {
            session: session,
            queryInput: {
              text: {
                text: text,
                languageCode: config.LanguageCode,
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


    handleAction: function(responses) {
        return responses;
    }
}