module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    size: DataTypes.INTEGER,
    url: DataTypes.STRING
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    })
  }

  return Post;
};