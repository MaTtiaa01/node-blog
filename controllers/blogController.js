
const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { blogs: result })
        })
        .catch(err => console.log(err))
}

const blog_create = (req, res) => {
    res.render('blogs/create')
}

const blog_store = (req, res) => {
    const new_blog = new Blog(req.body)

    new_blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
}

const blog_edit = (req, res) => {
    res.render('blogs/update')
}


module.exports = {
    blog_index,
    blog_create,
    blog_store,
    blog_edit
}