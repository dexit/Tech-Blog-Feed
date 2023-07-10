const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);

const userBlogs = require('./userBlogRoutes');
router.use('/blogs', userBlogs);

const userComments = require('./userCommentsRoutes');
router.use('/comments', userComments);



module.exports = router;