const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const users = require("./users.json");
const blogs = require("./blogs.json");
const comments = require("./comments.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });
  for (var blog of blogs) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }
    for (const comment of comments) {
      await Comment.create({
      ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_id: users[Math.floor(Math.random() * users.length)].id,
      });
      
    }
    
  process.exit(0);
};
seedDatabase();