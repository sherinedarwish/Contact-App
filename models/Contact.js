const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
});

const ContactModel = mongoose.model("Contact", ContactSchema);
module.exports = ContactModel;
