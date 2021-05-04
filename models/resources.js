const mongoose = require("mongoose");

const ResourcesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
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
    type: [],
    description: {
        type: String,
    },
    upVote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    link: {
        type: String
    }
    
} , { timestamps: true });

const Resources = mongoose.model("Resources", ResourcesSchema);
module.exports = Resources;
