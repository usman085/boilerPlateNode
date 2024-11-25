const { Users } = require('../../../models');
const { successResponse, errorResponse } = require('../../helper')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



let AuthController = {
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                username,
                email,
                password: hashedPassword
            });

            await newUser.save();

            successResponse(res, 200, "User successfully registered. Now you can login.", newUser);
        } catch (error) {
            console.error(error);
            // errorResponse(res, 500, 'An error occurred during signup');
        }
    },



    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ where: { email: email } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                // errorResponse(res, 401, 'Invalid email or password');
                return res.status(200).json('Invalid email or password');
                return;
            }

            const token = jwt.sign({ id: user.id }, process.env.NODE_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log('Generated Token:', token);
            return res.status(200).json({ token, user });
       
          
        } catch (error) {
            console.error("Error occurred during login:", error);
            // errorResponse(res, 500, "An error occurred during login");
        }
    },
   




};



module.exports = AuthController;
