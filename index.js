const express = require("express");
const bodyparser = require("body-parser");
app = express();

app.use(bodyparser.json());
port = process.env.PORT || 5000;

require('./routes/dialogFlowRoutes')(app);

app.listen(port, () => {
    console.log(`running on port no ${port}`)
})
