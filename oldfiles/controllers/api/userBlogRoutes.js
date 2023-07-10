const router = require("express").Router();
const { Blog , Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");
router.get("/", async (req, res) => {
    try {
      const blogo = await Blog.findAll({
        attributes: ["id", "title", "content", "date"],
        order: [["date", "ASC"]],
        include: {
          model: Comment
        }
      });
      res.status(200).json(blogo);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/:id", async (req, res) => {
    try {
      const blogo = await Blog.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(blogo);
    } catch (err) {
      res.status(500).json(err);
    }
  });  

router.post("/", withAuth, async (req, res) => {
    try {
      const blogoCreate = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(blogoCreate);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  router.put("/:id", withAuth, async (req, res) => {
    try {
      const blogoUpdate = await Blog.update(req.body,{
        where: {
          id: req.params.id,
        }})
      res.status(200).json(blogoUpdate);
    } catch (error) {
      console.error(error)
      res.status(400).json(error);
      console.error(error)
    }
  });
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      const blogo = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!blogo) {
        res.status(404).json({ message: "No blog found with this id!" });
        return;
      }
      res.status(200).json(blogo);
    } catch (error) {
      res.status(500).json(error);
    }
  });