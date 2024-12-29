const Admin = require('../models/Admin');
const adminResource = require('../resources/adminResource');
const fs = require('fs');
const path = require('path');
const uploadFile = require('../config/uploadFile');
const { success, fail } = require('../config/responses');
const { getAll, add } = require('../repositories/adminRebo');

const index = async (req, res) => {
    try {
        const pagination = parseInt(req.query.pagination) || 0; // Default pagination false 
        const adminData = await getAll(req); // Fetch all documents
        if (pagination) {

            return success(res, [{
                "data": adminData.data,
                "page": adminData.page,
                "limit": adminData.limit,
                "totalPages": adminData.totalPages
            }], "suceess", 200);
        }
        const formattedAdmins = adminData.map(admin => adminResource(admin));

        success(res, formattedAdmins, "suceess", 200);
    } catch (error) {
        fail(res, error.message, 500);
        // res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
const store = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const tempFilePath = req.file.path;
        const newFilePath = path.join(uploadFile('adminFiles'), req.file.filename);
        newAdmin.img = req.file.path;

        fs.rename(tempFilePath, newFilePath, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // After the file is moved, update the admin data with the file path
            newAdmin.img = newFilePath;
            try {
                // Save the new admin
                const adminData = await add(newAdmin);
                // Send success response with the created admin data
                res.status(201).json({
                    message: 'Admin created successfully',
                    admin: adminResource(adminData),
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}

const update = async (req, res) => {
    const adminId = req.params.id;
    try {

        if (req.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
            req.password = await bcrypt.hash(req.password, salt); // Hash the new password
        }
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return fail(res, "Not Found", 404);
        }
        admin.set(req.body);
        const updatedAdmin = await admin.save();
        res.status(200).json(adminResource(updatedAdmin));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
const show = async (req, res) => {
    const adminId = req.params.id;
    try {
        const admin = await Admin.findById(adminId).populate('role');
        if (!admin) {
            return fail(res, "Not Found", 404);
        }
        const formattedAdmins = adminResource(admin);
        res.status(200).json(formattedAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
const remove = async (req, res) => {
    const adminId = req.params.id;
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Not Found' });
        }
        res.status(200).json(adminResource(deletedAdmin));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}

module.exports = { index, store, update, show, remove }