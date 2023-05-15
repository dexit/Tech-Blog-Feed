const Post = require('./Post');
const Category = require('./Category');
const Tag = require('./Tag');
const PostTag = require('./PostTag');
const User = require('./User');


// Products belongsTo Category
Post.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "SET NULL"
})
// Products belongsTo User
Post.belongsTo(User, {
  foreignKey: "user_id",
})
// Categories have many Products
Category.hasMany(Post)
// User have many Products
User.hasMany(POst)
// Products belongToMany Tags (through ProductTag)
Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: "tag_id",
})


module.exports = {
  Post,
  Category,
  Tag,
  PostTag,
  User
};
