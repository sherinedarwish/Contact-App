let ContactModel = require("./models/Contact");


// POST METHOD
async function createcontact(body){
    const res = await ContactModel.create([{body}]);
};

// async function contactsCreate(req, res) {
//     const userId = req.user.id;
  
//     try {
//       const newContact = await Contact.create(req.body);
//       const user = await User.findById(userId);
//       user.contacts.push(newContact);
//       await user.save();
//       return res.status(201).json(newContact);
//     } catch ( err ) {
//       return res.status(500).json({ message: 'Something went wrong'});
//     }
//   }

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