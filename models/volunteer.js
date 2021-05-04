const mongoose = require("mongoose");

const ResourcesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    state: {
        type: String,
    },
    city: {
        type: String
    },
    address: {
        type: String,
    },
    type: {
        type: String,
    },
    link: {
        type: String, 
    }

});

const Resources = mongoose.model("Resources", ResourcesSchema);
module.exports = Resources;
