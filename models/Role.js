const mongoose=require('mongoose');
const permissionsList = require('./Permission'); // Adjust to the correct relative path

const roleSchema= mongoose.Schema({
    name: {
        type: String
        , required: true
        , unique: true
    }, 
    permissions: {
        type: [String], // Array of strings
        validate: {
            validator: function (permissions) {
                return permissions.every(permission => permissionsList.includes(permission));
            },
            message: props => `${props.value} contains invalid permissions`
        }
    },
},{timestamps: true})

module.exports=mongoose.model('Role',roleSchema);