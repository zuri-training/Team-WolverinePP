const express = require('express');


const app = express();

PORT = 5000;


// ****SERVER TEST****
app.get('/', (req,res) => {
    res.send('Testing Chunk server....!!!');
});



// ****SERVER*****
app.listen(PORT, 'localhost', () => {
    console.log(`server is running on port ${PORT}!`);
});