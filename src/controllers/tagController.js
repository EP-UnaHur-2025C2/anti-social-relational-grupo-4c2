const { Tag, Post } = require('../../models')

// Crear una nueva etiqueta
exports.createTag = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' })

    const newTag = await Tag.create({ name })
    res.status(201).json(newTag)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener todas las etiquetas
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll()
    res.json(tags)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Asociar una etiqueta a un post
exports.addTagToPost = async (req, res) => {
  try {
    const { postId, tagId } = req.params

    const post = await Post.findByPk(postId)
    const tag = await Tag.findByPk(tagId)

    if (!post || !tag) {
      return res.status(404).json({ error: 'Post o Tag no encontrado' })
    }

    await post.addTag(tag)
    res.json({ message: `Etiqueta '${tag.name}' agregada al post ${post.id}` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
