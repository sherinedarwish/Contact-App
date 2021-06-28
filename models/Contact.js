const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const ContactModel = mongoose.model("contact", ContactSchema,'contacts');
module.exports = ContactModel;
