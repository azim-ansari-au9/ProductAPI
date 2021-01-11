const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//importing product Routes
const ProductRoutes = require('./Routes/ProductRoutes')
app.use('/api',ProductRoutes);


// require envFile
require('dotenv').config();

const port = process.env.port || 6000;

//database connection
mongoose.connect(process.env.DATABASE ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected yeah!!')
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
