const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    number: Number
    
});

const ContactModel = mongoose.model("contact", ContactSchema,'contacts');
module.exports = ContactModel;
