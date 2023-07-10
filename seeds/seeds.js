const sequelize = require("../config/connection");
const { User, Blog } = require("../models").default;
const users = require("./userData.json");
const blogs = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[math.floor(Math.random() * users.length)],
    });
  }
  process.exit(0);
};
seedDatabase();