const Volunteer = require('../models/volunteer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const volunteerController = () => {

    const createVolunteer = async (req, res) => {
        const { name, phone, email, state, city, address, type } = req.body;
        try {
            const volunteer = await new Volunteer({ name: name, phone: phone, email:email, state:state, city:city, 
                address:address, type: type  }).save();
            if (!volunteer) {
                return res.status(409).json({
                    success: false,
                    message: 'Error while updating'
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



    const getVolunteer = async (req, res) => {
        try {
            let volunteers = await Volunteer.find()
            res.status(200).json({
                success: true,
                data: volunteers,
                message: "Success",
            });
        } catch (err) {
            console.log("err ->", err)
            return res.status(500).json({
                success: false,
                message: 'Internal Server error'
            });
        }

    };


    const deleteVolunteer = async (req, res) => {
        let id = req.query.id
        try {
            if (!id) {
                return res.status(200).json({
                    success: false,
                    message: 'Id Required',
                });
            }
            const volunteer = await Volunteer({ '_id': id })
            if (!volunteer) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid Id'
                });
            }
            const deleteresource = await Volunteer.remove({ _id: id });
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

    const updateVolunteer = async (req, res) => {
        const { id, name, phone, email, state, city, address, type } = req.body;
        if (!id) {
            return res.status(200).json({
                success: false,
                message: 'Id Required',
            });
        }
        try {
            const volunteer = await Volunteer.updateOne({ '_id': id },
             { $set: { name: name, phone: phone, email: email, state:state, city:city, address:address, type:type } 
            })
            if (!resource) {
                return res.status(200).json({
                    success: false,
                    message: 'Something went wrong'
                });
            }
            return res.status(200).json({
                success: true,
                message: "Updated"
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
        createVolunteer,
        getVolunteer,
        deleteVolunteer,
        updateVolunteer
    };
};

module.exports = volunteerController;
