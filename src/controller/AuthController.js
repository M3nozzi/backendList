require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../model/UserModel');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
}


class AuthController {

    async signup(req, res) {
        const { email } = req.body;
    
        try {
            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'email already exists!!' });
            
            const user = await User.create(req.body);
    
            user.password - undefined;
    
            return res.send({
                user,
                token: generateToken({id: user.id }),
            });
            
        } catch (err) {
            return res.status(400).send({ error: 'Signup failed!!!' })
        }
    };

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });
    
        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: "Invalid password" });
    
        user.password = undefined;
    
        res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    }
}

module.exports = new AuthController();