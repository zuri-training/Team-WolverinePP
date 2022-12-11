const mongoose = require('mongoose');
const { isEmail } = require('validator');


//****Data Schema for chunk_file project****

const chunkSchema = new mongoose.Schema({
  User: { 
    Name: { 
        type: String,
        trim: true,
        required: true
        },
    Email: { 
        type: String,
        required: true,
        trim: true,
        validate: { validator: isEmail,
                    message: "Please enter a valid email address.!"
                    }
            },
    Username: { 
        type: String,
        unique: true,
        trim: true,
        required: true
            },
    Password: { 
        type: String,
        unique: true,
        required: true
            },
    ConfirmPassword: {
        type: String,
        unique: true,
        required: true
      }
},
  
Date: { 
   type: Date,
   Default: Date.now()
  },

File: { 
    data: Buffer,
    contentType: String
      }
  },
{ timestamps: true }
);


// ****Create Model from Schema****

exports.fileSplitter = mongoose.model('fileSplitter', chunkSchema);



