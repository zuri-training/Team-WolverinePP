const ChunkFile = require("../models/chunkSchema");

// get all Chunked Files
exports.getAllChunks = async (req, res) => {
  try {
    let chunks = await ChunkFile.find();
    if (chunks.length === 0)
      return res.status(404).json({
        success: false,
        message: "No file found",
      });
    res.status(200).json({
      success: true,
      message: "List of Chunk Files",
      chunk,
      count: chunks.length,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
    })
  }
};


