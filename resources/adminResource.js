const adminResource = (admin) => {
    const imgPath = admin.img ?  admin.img : null;
    // Here you can modify the data if you need to remap it further
    return {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        status: admin.is_active ? 'Active' : 'Inactive',
        roles: admin.role, // Assuming roles have a 'name' field
        profileImageUrl: imgPath, // 
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
    };
};

module.exports = adminResource;