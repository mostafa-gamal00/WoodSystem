const Wood = require('../models/Wood');

// Fetch all wood data
const index = async (req, res) => {
  try {
    const woodData = await Wood.find(); // Fetch all documents
    res.status(200).json(woodData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

// Add a new wood item
const store = async (req, res) => {
  try {
    const newWood = new Wood(req.body);
    const savedWood = await newWood.save();
    res.status(201).json(savedWood);
  } catch (error) {
    res.status(400).json({ message: 'Error adding data', error: error.message });
  }
};

module.exports = { index, store };
