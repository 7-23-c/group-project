// import needed modules
const mongoose = require('mongoose');

// define the schema for our beacon model
const imageSchema = new mongoose.Schema({ 

    beacon: mongoose.Schema.Types.ObjectId,
    description: String,
    altTag: String,
    imgSource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beacon'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// create the model for image and expose it to our app
module.exports = mongoose.model('Images', imageSchema);
