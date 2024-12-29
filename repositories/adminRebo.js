const Admin = require('../models/Admin');


const getAll = async (req) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const pagination = parseInt(req.query.pagination) || 0; // Default pagination false 
    
    const skip = (page - 1) * limit;
    if(pagination){
        return  await Admin.find().populate('role')
        .skip(skip)
        .limit(limit);
    }
    return await Admin.find().populate('role');
}

const add = async (newAdmin) => {
    return await newAdmin.save();
}

module.exports = { getAll, add }