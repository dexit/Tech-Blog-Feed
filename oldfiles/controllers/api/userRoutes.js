const router = require("express").Router();
const { User, Comment } = require("../../models");

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const userobj = await User.create({
      ...req.body,
    });

    req.session.save(() => {
      req.session.user_id = userobj.id;
      req.session.logged_in = true;
      req.session.user = userobj;
      res.json({ user: userobj, message: "You have been successfully registered" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/login", async (req, res) => {
  try {
    const userobj = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userobj) {
      res.status(404).json({ message: "Incorrect username or password." });
      return;
    }
    const validPassword = await userobj.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: "Incorrect username or password." });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userobj.id;
      req.session.logged_in = true;
      req.session.user = userobj;
      res.json({ user: userobj, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
