const Contact = require("./models/Contact");
const User = require('./models/User');

//POST METHOD
async function createcontact(req,res){
    const userId = req.user._id;
    const { first_name,last_name,number } = req.body;

    const newContact = new Contact({
        first_name,
        last_name,
        number,
        userId
    });
    

    newContact
        .save()
        .then(contact => {
            console.log("New Contact Saved")})
        .catch(err => console.log(err))
};

// GET METHOD
async function getcontacts(req,res){
    const data = await Contact.find().catch(err=> console.error(err));
    return data
};

// GET CONTACTS FROM ID
async function getcontactsID(req){
    const userID = req.user._id;
    const data = await Contact.find({"userId": userID}).catch(err=> console.error(err));
    return data
};



// Delete Method
async function deletecontact(req,res){
    const paramsId = req.params._id;
   // const query = {"_id": ObjectId("4d512b45cc9374271b02ec4f") };
 //   const data = await Contact.deleteOne(query).catch(err=> console.error(err));
   // return data
};

module.exports = {
    createcontact,
    getcontacts,
    deletecontact,
    getcontactsID
}