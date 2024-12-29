const Wood = require('../models/Wood');
const {woodFilter} = require('../filters/woodFilter');


const getAll = async (req) => {
    const filteredReq = woodFilter(req.query);
    console.log(filteredReq);
    const totalCount = await Wood.countDocuments(filteredReq);
    const pagination = parseInt(req.query.pagination) || 0; // Default pagination false 
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const page = parseInt(req.query.page) || 1;
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;
    if(pagination){
        woods=  await Wood.find(filteredReq)
        .skip(skip)
        .limit(limit);

        return {
            data: woods||null,    
            limit: limit||null,
            page: page||null,
            totalPages: totalPages||null
        };
    }
    return await Wood.find(filteredReq);
}

const add = async (newWood) => {
    return await newWood.save();
}

module.exports = { getAll, add }