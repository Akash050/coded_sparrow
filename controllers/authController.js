const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authController = () => {

    const createAuth = async (req, res) => {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        try {
            const existingEmail = await Auth.findOne({ 'email': email })
            if (existingEmail) {
                return res.status(402).json({
                    success: false,
                    message: 'Email already exists'
                });
            }
            const auth = await new Auth({ email: email, password: hashedPassword }).save();
            if (!auth) {
                return res.status(409).json({
                    success: false,
                    message: 'Something went wrong'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Registered'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }

    };



    const authorize = async (req, res) => {
        const { email, password } = req.body;
        try {
            let auth = await Auth.findOne({ "email": email })
            if (!auth) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Email'
                });
            }
            let isMatch = await bcrypt.compare(password, auth.password)
            if (!isMatch) {
                return res.status(500).json({
                    success: false,
                    message: 'Invalid password'
                });
            }
           // const accessToken = authService().onetime_issue({ email: auth.email, role: auth.role, username: auth.username, id: auth._id });
            res.status(200).json({
                success: true,
                data: {
                  //  accessToken: accessToken,
                    email: auth.email,
                    id: auth._id
                },
                message: "You have succesfully loggedIn.",
            });
        } catch (err) {
            console.log("err ->", err)
            return res.status(500).json({
                success: false,
                message: 'Internal Server error'
            });
        }

    };


    const deleteAuth = async (req, res) => {
        let id = req.body.id
        try {
            if (!id) {
                return res.status(402).json({
                    success: false,
                    message: 'Id Required',
                });
            }
            const deleteAuth = await Auth.remove({ _id: id });
            return res.status(200).json({
                success: true,
                message: "deleted",
            });
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal Server error',
            });
        }
    };


    return {
        createAuth,
        authorize,
        deleteAuth
    };
};

module.exports = authController;
