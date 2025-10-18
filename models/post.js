'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Un post pertenece a un usuario
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'author' })

      // Un post tiene muchas imágenes
      Post.hasMany(models.Post_Image, { foreignKey: 'postId', as: 'images' })

      // Un post tiene muchos comentarios
      Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' })

      // Un post tiene muchas tags (etiquetas)
      Post.belongsToMany(models.Tag, {
        through: 'Post_Tags',
        as: 'tags',
        foreignKey: 'postId',
        otherKey: 'tagId'
      })
    }
  }

  Post.init({
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  })

  return Post
}
