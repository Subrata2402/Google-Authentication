const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: 'https://via.placeholder.com/150',
    },
    password: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;