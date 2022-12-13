const express = require('express');
const connect = require('./config/db')
const PORT = process.env.PORT || 5000;

const app = express();
connect();

// Require routes
const authRoutes = require('./routes/authRoute')

app.use(express.json())

app.use('/auth', authRoutes)

// ****SERVER TEST****
app.get('/', (req,res) => {
    res.send('Testing Chunk server....!!!');
});


// ****SERVER*****
app.listen(PORT, 'localhost', () => {
    console.log(`server is running on port ${PORT}!`);
});