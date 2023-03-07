const express = require('express');

const app = express();

app.listen('4000')

// set view engine
app.set('view engine', 'ejs')

//routes
app.get('/', (req, res) => {
    res.render('blogs/index')
})
