const express = require('express');
const {CreateBlog, getAllBlog, getBlogById, UpdateBlog, DeleteBlog, SearchBlog, verifyUser} =  require('../controller/blogcontroller');

const router = express.Router();

router.post('/article', CreateBlog);
router.get('/article', getAllBlog);
router.get('/article/:id', getBlogById);
router.put('/article/:id',verifyUser, UpdateBlog);
router.delete('/article/:id',verifyUser, DeleteBlog);
router.get('/search', SearchBlog);

module.exports = router;