const Product = require('../Model/Product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const {errorHandler} = require('../Helpers/dbErrorHandler');



// working as middleware to upload the photo 
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set ("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};
// //uploading controller for product
exports.upload = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image couldn't be uploaded",
            })
        }
        //check the all fields
        const {title, description, price, quantity } = fields
        if(!title || !description || !price || !quantity ) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        let product = new Product(fields)
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        //files.photo.type
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

//List of all product
exports.list = (req, res) => {
     let limit = req.query.limit ? parseInt(req.query.limit) : 6
     let order = req.query.order ? req.query.order : 'asc'
     let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    
     Product.find().select("-photo").populate('category').sort([[sortBy, order]]).limit(limit)
     .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
     })
};