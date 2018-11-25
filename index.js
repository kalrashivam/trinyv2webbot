const express = require("express");
const bodyparser = require("body-parser");
app = express();

app.use(bodyparser.json());
port = process.env.PORT || 5000;

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


require('./routes/dialogFlowRoutes')(app);

app.listen(port, () => {
    console.log(`running on port no ${port}`)
})
