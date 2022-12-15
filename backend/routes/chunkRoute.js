const express = require('express');
const router = express.Router();
const chunkController = require('../controllers/chunkController');
const {authenticateUser} = require('../middleware/authetication')
// "authenticateUser" should be added to protected routes as a second parameter.

router.get("/library", authenticateUser, chunkController.getAllChunks)





module.exports = router;