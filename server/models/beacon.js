// import needed modules
const mongoose = require('mongoose');

// define the schema for our beacon model
const beaconSchema = new mongoose.Schema({ 
    name: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    images: [{
        _id: false,
        image_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    }]
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// create the model for beacon and expose it to our app
module.exports = mongoose.model('Beacon', beaconSchema);
