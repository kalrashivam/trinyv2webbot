const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionClient = new dialogflow.SessionsClient();

const session = sessionClient.sessionPath(config.googleProjectID, config.dialogflowFlowSession);

module.exports = app => {
app.get("/", (req,res) => {
    res.send({"event":"My name is ranveer ching"});
});

app.post("/api/df_text_query", async (req,res) => {

  console.log(req.body.text);

    const request = {
        session: session,
        queryInput: {
          text: {
            text: req.body.text,
            languageCode: config.LanguageCode,
          },
        },
      };

    
    let responses = await sessionClient
      .detectIntent(request);

    res.send(responses[0].queryResult);  
})

app.post("/api/df_event_query", (req,res) => {
    res.send({"event":"My name is ranveer ching"});
})


}