'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Un usuario tiene muchos posts
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' })

      // Un usuario tiene muchos comentarios
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' })

      // Self many-to-many: followers (corregido)
      User.belongsToMany(models.User, {
        as: 'Followers',              // los que siguen a este usuario
        through: 'UserFollowers',     // nombre de tabla intermedia corregido
        foreignKey: 'followedId',
        otherKey: 'followerId'
      })

      User.belongsToMany(models.User, {
        as: 'Following',              // los que este usuario sigue
        through: 'UserFollowers',     // mismo nombre de tabla intermedia
        foreignKey: 'followerId',
        otherKey: 'followedId'
      })
    }
  }

  User.init({
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    }
  }, {
    sequelize,
    modelName: 'User',
  })

  return User
}
