const express = require('express');
const router = express.Router();
const { Post, Tag, User } = require('../../models');
const postController = require('../controllers/postController');

// 🟢 Crear un post
router.post('/', postController.createPost);

// 🟡 Listar posts con paginación y filtro opcional por etiqueta (?tag=nodejs&page=1&limit=10)
router.get('/', async (req, res) => {
  try {
    const { tag, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const include = [
      { model: User, as: 'author', attributes: ['id', 'nickName'] },
      {
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] },
        ...(tag ? { where: { name: tag } } : {})
      }
    ];

    const { rows: posts, count } = await Post.findAndCountAll({
      include,
      distinct: true,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    if (tag && posts.length === 0)
      return res.status(404).json({ message: `No se encontraron posts con la etiqueta '${tag}'` });

    res.json({
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalPosts: count,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los posts' });
  }
});

// 🔵 Obtener post por ID (incluye autor y etiquetas)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'nickName'] },
        { model: Tag, as: 'tags', attributes: ['id', 'name'], through: { attributes: [] } }
      ]
    });

    if (!post)
      return res.status(404).json({ message: 'Post no encontrado' });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el post' });
  }
});

// 🟠 Actualizar post
router.put('/:id', postController.updatePost);

// 🔴 Eliminar post
router.delete('/:id', postController.deletePost);

// 🔥 Asociar una etiqueta existente a un post
router.post('/:postId/addTag/:tagId', async (req, res) => {
  const { postId, tagId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    const tag = await Tag.findByPk(tagId);

    if (!post || !tag)
      return res.status(404).json({ message: 'Post o Tag no encontrado' });

    await post.addTag(tag);
    res.json({ message: `Etiqueta '${tag.name}' agregada al post ${post.id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al asociar etiqueta', error });
  }
});

// 🧹 Quitar etiqueta de un post
router.delete('/:postId/removeTag/:tagId', async (req, res) => {
  const { postId, tagId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    const tag = await Tag.findByPk(tagId);

    if (!post || !tag)
      return res.status(404).json({ message: 'Post o Tag no encontrado' });

    await post.removeTag(tag);
    res.json({ message: `Etiqueta '${tag.name}' eliminada del post ${post.id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar etiqueta', error });
  }
});

module.exports = router;

