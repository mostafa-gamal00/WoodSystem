const Admin = require('../models/Admin');


const getAll = async (req) => {
    const totalCount = await Admin.countDocuments();
    const pagination = parseInt(req.query.pagination) || 0; // Default pagination false 
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const page = parseInt(req.query.page) || 1;
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit; 
    if(pagination){
        admins=  await Admin.find().populate('role');
        return {
            data: admins||null,    
            limit: limit||null,
            page: page||null,
            totalPages: totalPages||null
        };
    }
    return await Admin.find().populate('role');
}

const add = async (newAdmin) => {
    return await newAdmin.save();
}

module.exports = { getAll, add }