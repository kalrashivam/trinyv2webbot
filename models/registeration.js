const mongoose = require("mongoose");
const { Schema } =  mongoose;

const registerationSchema = new Schema({
    email: String,
    name: String
});

mongoose.model("register", registerationSchema)
