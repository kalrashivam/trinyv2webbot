
const chatbot = require('../chatbot/chatbot');

module.exports = app => {
app.get("/", (req,res) => {
    res.send({"event":"My name is ranveer ching"});
});

app.post("/api/df_text_query", async (req,res) => {

  console.log(req.body.text);

  let responses = await chatbot.textQuery(req.body.text, req.body.parameters);

  res.send(responses[0].queryResult);  
});

app.post("/api/df_event_query", async (req,res) => {
    console.log(req.body.event);

    let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
  
    res.send(responses[0].queryResult); 
});


}