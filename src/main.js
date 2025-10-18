require('dotenv').config()
const express = require('express')
const { sequelize } = require('../models')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const app = express()
app.use(express.json())

// Importar rutas
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const postImageRoutes = require('./routes/postImageRoutes')
const tagRoutes = require('./routes/tagRoutes')

// Usar rutas
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/images', postImageRoutes)
app.use('/api/tags', tagRoutes)

// 📘 Documentacion Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Conexion y arranque
async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('✅ Conexión a la base de datos establecida correctamente.')

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
      console.log(`📘 Swagger disponible en: http://localhost:${PORT}/api-docs`)
    })
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error)
  }
}

startServer()
