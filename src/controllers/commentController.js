const { Comment, Post, User } = require('../../models')
const { Op } = require('sequelize')

// Calcular fecha limite según meses del .env
function getOldestAllowedDate() {
  const months = parseInt(process.env.COMMENT_MAX_AGE_MONTHS || 6)
  const date = new Date()
  date.setMonth(date.getMonth() - months)
  return date
}

const commentController = {
  // Crear un comentario
  async createComment(req, res) {
    try {
      const { text, postId, userId } = req.body

      if (!text || !postId || !userId) {
        return res.status(400).json({ error: 'text, postId y userId son obligatorios' })
      }

      const post = await Post.findByPk(postId)
      const user = await User.findByPk(userId)
      if (!post || !user) {
        return res.status(404).json({ error: 'Post o usuario no encontrado' })
      }

      const comment = await Comment.create({
        text,
        visible: true,
        postId,
        userId
      })

      res.status(201).json(comment)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Listar comentarios de un post (solo visibles y recientes)
  async getCommentsByPost(req, res) {
    try {
      const { postId } = req.params
      const limitDate = getOldestAllowedDate()

      const comments = await Comment.findAll({
        where: {
          postId,
          visible: true,
          createdAt: { [Op.gte]: limitDate }
        },
        include: [{ model: User, as: 'author', attributes: ['id', 'nickName'] }],
        order: [['createdAt', 'DESC']]
      })

      res.json(comments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Eliminar un comentario
  async deleteComment(req, res) {
    try {
      const { id } = req.params
      const comment = await Comment.findByPk(id)

      if (!comment) {
        return res.status(404).json({ error: 'Comentario no encontrado' })
      }

      await comment.destroy()
      res.json({ message: 'Comentario eliminado' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = commentController
