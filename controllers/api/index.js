const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userBlogs = require('./userBlogRoutes');
const userComments = require('./userCommentsRoutes.js');

router.use('/user', userRoutes);
router.use('/blogs', userBlogs);
router.use('/comments', userComments);



module.exports = router;