let ContactModel = require("./models/Contact");


// POST METHOD
async function createcontact(body){
   // console.log("body: ", body);
    const res = await ContactModel.create([{body}]);
   // console.log("final result: " ,res);
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