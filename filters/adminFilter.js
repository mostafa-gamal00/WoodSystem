const adminFilter = (filters) => {

    let query = {};

    // Apply the filters if they are present in the request
    if (filters.name) {
        // Use $or to check both name_en and name_ar fields
            query['name'] = { $regex: filters.name, $options: 'i' };
    }
    if (filters.email) {
        query['email'] = { $regex: filters.email, $options: 'i' }; // Case-insensitive match for name_en
    }

    if (filters.is_active) {
        query['is_active'] = { $regex: filters.name_ar, $options: 'i' }; // Case-insensitive match for name_ar
    }

    if (filters.created_at_from || filters.created_at_to) {
        query.createdAt = {};  // Initialize created_at query object

        // If 'from' filter is provided, filter documents greater than or equal to 'from' date
        if (filters.created_at_from) {
            query.createdAt.$gte = new Date(filters.created_at_from);  // MongoDB expects a Date object
        }

        // If 'to' filter is provided, filter documents less than or equal to 'to' date
        if (filters.created_at_to) {
            query.createdAt.$lte = new Date(filters.created_at_to);  // MongoDB expects a Date object
        }
    }
    return query;
    // You can also handle pagination directly in the database query


    // Fetch filtered data from the database (assuming `Wood` is your model)
}

module.exports = {adminFilter};