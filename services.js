let ContactModel = require("./models/Contact");


// POST METHOD
async function createcontact(body){
    const res = await ContactModel.create([{body}]);
};

// GET METHOD
async function getcontacts(req,res){
    const data = await ContactModel.find().catch(err=> console.error(err));
    console.log(data);
    return data
};

module.exports = {
    createcontact,
    getcontacts
}