const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/withAuth");
const util = require('util');


router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogo = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["email", "first_name", "last_name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const blogs = blogo.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
    });
    console.log(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/homepage", async (req, res) => {
  if (req.session.logged_in) {
    const blogo = await Blog.findAll({
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          
        },
        {
          model: Comment,
        
        },
      ],
    });
    const blogs = blogo.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
    });
  } else {
    const blogo = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
    const commento = await Comment.findAll();
    const blogs = blogo.map((blog) => blog.get({ plain: true }));
    const comments = commento.map((comment) => comment.get({ plain: true }));
    res.render("homepage", {
      blogs,
      comments,
    });
  }
});
router.get("/homepage/:id", async (req, res) => {
  
  try {
    const blogo = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [User, { model: Comment, include: [User] }],
    });

    const blogs = blogo.get({ plain: true });
    console.log(util.inspect(blogs, {showHidden: false, depth: 10, colors: true}));
    res.render("singleBlog", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
      is_creator: blogs.user.id === req.session.user_id
    });
  } catch (error) {
    res.status(500).json(error);
  }

});
router.get("/newblog", async (req, res) => {
  if (req.session.logged_in) {
    res.render("newblog", {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.render("login");
});
router.get("*", async (req, res) => {
  
  res.redirect("/homepage");
});
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});
router.get("/logout", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  } else {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
  //res.render('login');
});

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("register");
});




module.exports = router;
