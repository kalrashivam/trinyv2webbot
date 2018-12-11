const express = require("express");
const bodyparser = require("body-parser");
const config = require("./config/keys.js");
const mongoose = require("mongoose");
app = express();

app.use(bodyparser.json());
port = process.env.PORT || 5000;

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


mongoose.connect(config.mongoURI, {useNewUrlParser: true});
require('./models/registeration.js');

require('./routes/dialogFlowRoutes')(app);

app.listen(port, () => {
    console.log(`running on port no ${port}`)
})
