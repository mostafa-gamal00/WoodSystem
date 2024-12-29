const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const Schema = mongoose.Schema;
const adminSchema = mongoose.Schema({
    name: {
        type: String
        , required: true
        , minlength: [3, 'Type must be at least 3 characters long']
        , maxlength: [30, 'Type cannot be longer than 30 characters']
    },
    email: {
        type: String
        , required: true
        , unique: true // Ensure email uniqueness
        , match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address', // Error message if invalid email
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },

    is_active: {
        type: Number,
        required: false,
        enum: {
            values: [0, 1], // Only allow values 0 or 1
            message: 'isActive can only be 0 or 1', // Error message for invalid value
        },
        default: 1,
    },
    app_lang: {
        type: String,
        required: false,
        default: 'en',

    },
    role: [{ // Array of Role IDs
        type: Schema.Types.ObjectId,
        ref: 'Role', // Reference the Role model
        required: true
    }],
    img: {
        type: String,
        required: false,

    },
}, { timestamps: true });
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // If the password isn't modified, just continue
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10); // Salt rounds (work factor)
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next(); // Continue to save the document
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});
module.exports = mongoose.model('Admin', adminSchema);