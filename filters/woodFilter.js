const woodFilter = (filters) => {

    let query = {};

    // Apply the filters if they are present in the request
    if (filters.name) {
        // Use $or to check both name_en and name_ar fields
        query['$or'] = [
            { 'name.name_en': { $regex: filters.name, $options: 'i' } }, // Case-insensitive match for name_en
            { 'name.name_ar': { $regex: filters.name, $options: 'i' } }  // Case-insensitive match for name_ar
        ];
    }
    if (filters.name_en) {
        query['name.name_en'] = { $regex: filters.name_en, $options: 'i' }; // Case-insensitive match for name_en
    }

    if (filters.name_ar) {
        query['name.name_ar'] = { $regex: filters.name_ar, $options: 'i' }; // Case-insensitive match for name_ar
    }

    if (filters.type) {
        query.type = { $regex: filters.type, $options: 'i' };
    }

    if (filters.quantity) {
        query.quantity = filters.quantity;
    }
    return query;
    // You can also handle pagination directly in the database query


    // Fetch filtered data from the database (assuming `Wood` is your model)
}

module.exports = {woodFilter};