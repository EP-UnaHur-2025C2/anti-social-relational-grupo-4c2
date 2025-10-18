'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post_Image extends Model {
    static associate(models) {
      Post_Image.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' })
    }
  }

  Post_Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post_Image',
    tableName: 'Post_Images'
  })

  return Post_Image
}
