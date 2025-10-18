const { Post_Image, Post } = require('../../models')

const postImageController = {

  // Agregar una imagen a un post
  async addImage(req, res) {
    try {
      const { postId, url } = req.body

      if (!postId || !url) {
        return res.status(400).json({ error: 'postId y url son obligatorios' })
      }

      const post = await Post.findByPk(postId)
      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' })
      }

      const image = await Post_Image.create({ postId, url })
      res.status(201).json(image)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Obtener todas las imágenes de un post
  async getImagesByPost(req, res) {
    try {
      const { postId } = req.params
      const images = await Post_Image.findAll({ where: { postId } })
      res.json(images)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Eliminar una imagen
  async deleteImage(req, res) {
    try {
      const { id } = req.params
      const image = await Post_Image.findByPk(id)
      if (!image) {
        return res.status(404).json({ error: 'Imagen no encontrada' })
      }

      await image.destroy()
      res.json({ message: 'Imagen eliminada correctamente' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = postImageController
