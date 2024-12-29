const woodResource = (wood) => {
    return {
        id: wood._id,
        name: wood.name,
        name_en: wood.name.name_en||null,
        name_ar: wood.name.name_ar||null,
        type: wood.type,
        quantity: wood.quantity,
        createdAt: wood.createdAt,
        updatedAt: wood.updatedAt
    };
};

module.exports = woodResource;