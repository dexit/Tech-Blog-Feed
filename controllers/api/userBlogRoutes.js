const router = require("express").Router();
const { Blog , Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.post("/", withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newBlog);
    } catch (error) {
      res.status(400).json(error);
    }
  });