const express = require('express');
const router = express.Router();
const {upload,list} = require('../Controller/ProductController');


//get method
router.get('/products',list)

// Post method
 router.post('/product/upload',upload);

module.exports = router;