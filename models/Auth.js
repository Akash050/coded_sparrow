const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }

});

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;
