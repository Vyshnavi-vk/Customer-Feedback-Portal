const Users = require('../models/userModel.js')
const generateToken = require('../utils/generateToken.js')

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await Users.create({
        name,
        email,
        password,
    });

    if (user) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });


    }
    else {
        res.status(400);
        throw new Error("User not found");
    }

}



const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (user && (user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
}


module.exports = { register, login }