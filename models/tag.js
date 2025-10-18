'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Relación N:M con Post
      Tag.belongsToMany(models.Post, {
        through: 'Post_Tags',
        foreignKey: 'tagId',
        otherKey: 'postId',
        as: 'posts'
      })
    }
  }

  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
  })

  return Tag
}
