const Wood = require('../models/Wood');
const woodResource = require('../resources/woodResource');
const { success, fail } = require('../config/responses');
const { transformNameData } = require('../config/helper');
const { getAll, add } = require('../repositories/woodRebo');

const index = async (req, res) => {
    try {
        const result = await getAll(req);
        if (req.query.pagination) {
            return success(res, [{
                "data": result.data,
                "page": result.page,
                "limit": result.limit,
                "totalPages": result.totalPages
            }], "suceess", 200);

        }
        success(res, woods.map(wood => woodResource(wood)), 'success', 200);
    } catch (error) {
        fail(res, error, 500);
    }

}
const store = async (req, res) => {
    try {
        transformedName = transformNameData(req.body.name_en, req.body.name_ar);
        const requestBody = {
            name: transformedName, // Add the transformed name data
            type: req.body.type,         // Add other fields (e.g., type, quantity)
            quantity: req.body.quantity
        };
        const data = new Wood(requestBody);
        const wood = await add(data);
        success(res, wood, 'success', 200);
    } catch (error) {
        fail(res, error, 500);
    }

}
module.exports = { index, store };
