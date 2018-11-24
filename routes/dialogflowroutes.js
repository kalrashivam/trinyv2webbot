const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogflowFlowSession);

module.exports = app => {
app.get("/", (req,res) => {
    res.send({"event":"My name is ranveer ching"});
});

app.post("/api/df_text_query", (req,res) => {

    const request = {
        session: session,
        queryInput: {
          text: {
            text: req.body.text,
            languageCode: config.languageCode,
          },
        },
      };

    
    sessionClient
      .detectIntent(request)
      .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      })
      .catch(err => {
        console.error('ERROR:', err);
      });

    res.send({"event":"My name is ranveer ching"});  
})

app.post("/api/df_event_query", (req,res) => {
    res.send({"event":"My name is ranveer ching"});
})


}