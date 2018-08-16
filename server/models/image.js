// import needed modules
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({ 
    description: String,
    alt: String,
    beacon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beacon',
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// create the model for image and expose it to our app
module.exports = mongoose.model('Image', imageSchema);