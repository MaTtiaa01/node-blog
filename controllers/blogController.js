
const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { blogs: result })
        })
        .catch(err => console.log(err))
}

const blog_details = (req, res) => {
    console.log(req.params.id);
    const id = (req.params.id);
    Blog.findById(id)
        .then(result => {
            console.log(result);
            res.render('singleBlog', { blog: result });
        })
        .catch(err => {
            console.log(err);
            // res.render('404');
        });
}

const blog_create_get = (req, res) => {
    res.render('create')
}

const blog_create_post = (req, res) => {
    const new_blog = new Blog(req.body)

    new_blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
}

const blog_update_get = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('update', { blog: result })
        })
        .catch(err => console.log(err))
}

const blog_update_post = (req, res) => {
    const id = req.params.id
    console.log(req.body);
    Blog.findById(id)
        .then((result) => {
            result.title = req.body.title
            result.description = req.body.description
            result.body = req.body.body
            result.save()
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
}


const blog_delete = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
}




module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_update_get,
    blog_update_post,
    blog_delete,
}