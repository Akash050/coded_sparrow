const Resources = require('../models/resources');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const resourceController = () => {

    const createResource = async (req, res) => {
        const { name, phone, email, state, city, address, type, description, status, link} = req.body;
        if(typeof(type) != 'object'){
            return res.status(200).json({
                success: false,
                message: 'Type must be array'
            });
        }
        try {
            const resource = await new Resources({ name: name, phone: phone, email:email, state:state, city:city, 
                address:address, type: type, description:description, status:status, link:link  }).save();
            if (!resource) {
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
            console.log("er ->", err)
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }

    };



    const getResources = async (req, res) => {
        let {page , size  , state, city} = req.body                   
        const skip = (page - 1) * size; 
        try {
            let resources = await Resources.find({})  
            .skip(skip)          
            .limit(size)
            let FilteredData
            let stateFilter
            if(state == '' && city == ''){
                FilteredData = resources
            }else if (state != '' && city == '') {
                FilteredData = resources.filter(val => val.state == state)
            }
            else if (state != '' && city != ''){
                FilteredData = resources.filter(val => val.city == city) 
            }
            else if (state == '' && city != ''){
                FilteredData = resources.filter(val => val.city == city) 
            }
            res.status(200).json({
                success: true,
                data: FilteredData.reverse(),
                message: "Success",
            });
        } catch (err) {
            console.log("e mess->", err)
            return res.status(500).json({
                success: false,
                message: 'Internal Server error'
            });
        }

    };


    const deleteResource = async (req, res) => {
        let id = req.query.id
        try {
            if (!id) {
                return res.status(200).json({
                    success: false,
                    message: 'Id Required',
                });
            }
            const resources = await Resources.findOne({ '_id': id })
            if (!resources) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid Id'
                });
            }
            const deleteresource = await Resources.remove({ _id: id });
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

    const updateResources = async (req, res) => {
        const {id, name, phone, email, state, city, address, type, description, status } = req.body;
        if (!id) {
            return res.status(200).json({
                success: false,
                message: 'Id Required',
            });
        }
        try {
            const resource = await Resources.updateOne({ '_id': id },
             { $set: { name: name, phone: phone, email: email, state:state, city:city, address:address,
                 type:type, description:description, status:status , link:link} 
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
        createResource,
        getResources,
        deleteResource,
        updateResources
    };
};

module.exports = resourceController;
