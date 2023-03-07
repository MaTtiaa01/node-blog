const express = require('express');
const blogRoutes = require('./routes/blogRoutes')
const morgan = require('morgan')

const app = express();

//connect to db
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mattia2001:KswyCRd5Xrt9KyFq@cluster0.gumz4jb.mongodb.net/?retryWrites=true&w=majority')
    .then((results) => {
        app.listen('4000')
    })
    .catch((err) => {
        console.log(err);
    })

// set view engine
app.set('view engine', 'ejs')


//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//to go on
app.use((req, res, next) => {
    res.locals.path = req.path
    next()
})



//routes
app.use('/blog', blogRoutes)

