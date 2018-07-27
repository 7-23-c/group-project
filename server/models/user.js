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
        friend_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    beacons: [{
        beacon_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Beacon'
        }
    }]
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
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);