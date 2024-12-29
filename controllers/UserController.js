const User = require('../models/User');


const index = async (req, res) => {
    try {
        const userData = await User.find(); // Fetch all documents
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
const store = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const userData = await newUser.save(); // Fetch all documents
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}

const update = async (req, res) => {
    const userId = req.params.id;
    try {

        if (req.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
            req.password = await bcrypt.hash(req.password, salt); // Hash the new password
        }
        const user = await User.findById(userId);
        if (!user) {
         return  res.status(404).json({ message: 'Not Found' });
        }
        user.set(req.body);
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
const show = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Not Found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
const remove = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Not Found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}

module.exports = { index, store, update, show, remove }