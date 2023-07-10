const router = require("express").Router();
const { Comment, Blog, User } = require("../../models");
const withAuth = require("../../utils/withAuth");
router.post("/", withAuth, async (req, res) => {
    try {
      console.log(req.body);
      const commentoCreate = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        
      });
      res.status(200).json(commentoCreate);
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  });
  router.get("/", async (req, res) => {
    try {
      const commento = await Comment.findAll({
        include: [
          {
            model: Blog,
          },
          {
            model: User,
          },
        ],
      });
      res.status(200).json(commento);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const commento = await Comment.findAll({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(commento);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;