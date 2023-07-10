/* This is a Sequelize model for a Comment with properties such as id, content, user_id, and blog_id. */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true, 
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      blog_id: {
        type: DataTypes.INTEGER,
                references: {
                  model: "blog",
                  key: "id",
                },
      }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "comment",
  }
)
module.exports = Comment