const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        trim: true,
        requires: true,
        maxlenght: 32
    },
    description : {
        type: String,
        trim: true,
        requires: true,
        maxlenght: 3000
    },
   price : {
        type: Number,
        trim: true,
        requires: true,
        maxlenght: 32
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    }
   }
);

module.exports = mongoose.model("Product", productSchema);