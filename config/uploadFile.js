// Example of uploadFile function
const path = require('path');

// Make sure this function returns a valid directory path
const uploadFile = (directory) => {
    return path.join('uploads',directory); // Example: 'uploads/adminFiles'
};

module.exports = uploadFile;
