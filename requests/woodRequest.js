const { body, validationResult } = require('express-validator');

const validateWood = [
    body('name_en').notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('must be at least 3 characters '),
   body('name_ar').notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('must be at least 3 characters '),

    // body('type')
    //     .optional().withMessage('Invalid email address'),
        body('quantity')
        .isFloat({ min: 0 })  // Ensure quantity is a float and greater than 0
        .withMessage('Quantity must be a valid number'), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or controller
    }
];
console.log('vaedation');

module.exports = validateWood;
