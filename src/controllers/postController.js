const { Post, User } = require('../../models')

// Controlador con operaciones CRUD de Post
const postController = {

  // Crear un post
  async createPost(req, res) {
    try {
      const { description, userId } = req.body

      // Validación básica
      if (!description || !userId) {
        return res.status(400).json({ error: 'Descripción y userId son obligatorios' })
      }

      // Verificar que el usuario exista
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      // Crear el post
      const post = await Post.create({ description, userId })
      res.status(201).json(post)

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Obtener todos los posts
  async getAllPosts(req, res) {
    try {
      const posts = await Post.findAll({
        include: { model: User, as: 'author', attributes: ['id', 'nickName'] }
      })
      res.json(posts)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Obtener un post por ID
  async getPostById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: { model: User, as: 'author', attributes: ['id', 'nickName'] }
      })

      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Actualizar un post
  async updatePost(req, res) {
    try {
      const { id } = req.params
      const { description } = req.body

      const post = await Post.findByPk(id)
      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' })
      }

      await post.update({ description })
      res.json(post)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Eliminar un post
  async deletePost(req, res) {
    try {
      const { id } = req.params
      const post = await Post.findByPk(id)

      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' })
      }

      await post.destroy()
      res.json({ message: 'Post eliminado correctamente' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = postController
