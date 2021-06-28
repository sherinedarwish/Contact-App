const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
<<<<<<< Updated upstream
        default: Date.now,
    },
=======
        default: Date.now
    }
>>>>>>> Stashed changes
});

module.exports = mongoose.model("User", UserSchema);
