const { User } = require('../../models')

// Controlador con todas las operaciones CRUD de User
const userController = {
  
  // Crear un nuevo usuario
  async createUser(req, res) {
    try {
      const { nickName, email } = req.body

      // Validación básica
      if (!nickName || !email) {
        return res.status(400).json({ error: 'nickName y email son obligatorios' })
      }

      // Crear usuario en la base de datos
      const user = await User.create({ nickName, email })
      res.status(201).json(user)

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Obtener todos los usuarios
  async getUsers(req, res) {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Obtener un usuario por ID
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Actualizar un usuario
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { nickName, email } = req.body

      const user = await User.findByPk(id)
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

      await user.update({ nickName, email })
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Eliminar un usuario
  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

      await user.destroy()
      res.json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = userController
