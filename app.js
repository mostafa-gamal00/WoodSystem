const express = require('express');
const connectDB = require('./config/database');

const adminApiRouters = require('./routes/adminApis');
const userApiRouters = require('./routes/userApis');

require('dotenv').config();
const app = express();

// Connect to the database

connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    //start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
});

// Middleware
app.use(express.json());

// Routes (example)
app.get('/', (req, res) => res.send('API is running!'));

//woods routs
app.use('/api/admin',adminApiRouters);

app.use('/api/user',userApiRouters);


app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });