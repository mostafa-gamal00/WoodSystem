const upload = require('../config/upload');
const Admin = require('../models/Admin')
const { body, validationResult } = require('express-validator');

const validateAdmin = [
    upload.single('img'), // Parse the image file
    body('name').notEmpty().withMessage('Name is required')
        .isLength({ min: 6 }).withMessage('must be at least 6 characters '),

    body('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            const existingAdmin = await Admin.findOne({ email: value });
            if (existingAdmin) {
                throw new Error('Email already in use');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
    body('role').isArray().withMessage('Role must be an array'),

    // Custom validation for role array elements
    body('role.*').isMongoId().withMessage('Each role must be a valid MongoDB ObjectId'),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or controller
    }
];
console.log('vaedation');

module.exports = validateAdmin;
