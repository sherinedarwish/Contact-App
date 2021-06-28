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
    console.log(first_name,last_name,number);

    newContact
        .save()
        .then(contact => {
            console.log("Contact Saved")})
        .catch(err => console.log(err))
};

// async function createcontact(req,res) {
    
//     const userId = req.user._id;

//     try {
//       const newContact = await Contact.create(req.body);
//       const user = await User.findById(userId);

//       user.contacts.push(newContact);
   
//       await user.save();
//       return newContact;
//     } 
//     catch ( err ) {
//       return err
//     }
//   }

// GET METHOD
async function getcontacts(req,res){
    const data = await Contact.find().catch(err=> console.error(err));
    //const data = JSON.stringify([extractdata]);
    //const newdata = JSON.parse(data);
    //console.log(data);
    return data
};

module.exports = {
    createcontact,
    getcontacts
}