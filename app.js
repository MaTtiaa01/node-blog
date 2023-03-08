const express = require('express');
const blogRoutes = require('./routes/blogRoutes')
const morgan = require('morgan')
const path = require('path')
const _ = require('lodash')

const app = express();

// //import bootstrap
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))



//connect to db
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mattia2001:KswyCRd5Xrt9KyFq@cluster0.gumz4jb.mongodb.net/node-blogs')
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
app.use('/blogs', blogRoutes)


//404 page not found
app.use((req, res) => {
    res.status(404).render('404')
})

