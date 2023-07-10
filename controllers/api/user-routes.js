
const router = require("express").Router();
const { User, Comment } = require("../../models");


router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      ...req.body,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user = userData;
      res.json({ user: userData, message: "You have been successfully registered" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      res.status(404).json({ message: "Incorrect username or password." });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: "Incorrect username or password." });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user = userData;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(400).json(error);
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


module.exports = router;
