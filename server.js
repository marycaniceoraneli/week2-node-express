const express = require('express');
require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
// Custom request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});
app.use(express.static(__dirname));

//GET Home Route
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js and Express API!');
});

//POST User Route
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    res.status(201).json({
        message: 'User created successfully',
        user: {
            name,
            email
        }
    });
});

//GET User by ID Route
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    res.json({
        message: 'User details retrieved',
        userId: userId
    });
});

//Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: 'Something went wrong!'
    });
});

//Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});