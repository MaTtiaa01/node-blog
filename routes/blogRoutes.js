const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router()

router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create)
router.post('/', blogController.blog_store)

module.exports = router