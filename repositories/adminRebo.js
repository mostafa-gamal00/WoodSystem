const Admin = require('../models/Admin');
const {adminFilter} = require('../filters/adminFilter');


const getAll = async (req) => {
    const filteredReq = adminFilter(req.query);
    const totalCount = await Admin.countDocuments(filteredReq);
    const pagination = parseInt(req.query.pagination) || 0; // Default pagination false 
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const page = parseInt(req.query.page) || 1;
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit; 
    if(pagination){
        admins=  await Admin.find(filteredReq).populate('role');
        return {
            data: admins||null,    
            limit: limit||0,
            page: page||0,
            totalPages: totalPages||0
        };
    }
    return await Admin.find(filteredReq).populate('role');
}

const add = async (newAdmin) => {
    return await newAdmin.save();
}

module.exports = { getAll, add }