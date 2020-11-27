
const mongoose = require('../config/database');

const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
            trim:true, 
        },
        password: {
            type: String,
            required: true,
            select: false, 
        },
        googleID: String,
        path: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },

        updateAt: {
            type: Date,
            default: Date.now,
        },
    }
);

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;