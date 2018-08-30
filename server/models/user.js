// import needed modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the schema for our user model
const userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    username: String,
    name: {
        first: String,
        last: String
    },
    friends: [{
        _id: false,
        friend_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        accepted: {
            type: Boolean,
            default: false
        },
        sender: {
            type: Boolean,
            default: false
        }
    }],
    beacons: [{
        beacon_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Beacon'
        }
    }],
    resetPassLink: String
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 12, null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);