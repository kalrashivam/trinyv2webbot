const express = require("express");
app = express();

port = process.sys.PORT || 5000;

app.listen(port, () => {
    console.log(`running on port no ${port}`)
})

app.get("/", (req,res) => {
    res.send({"event":"My name is ranveer ching"});
})