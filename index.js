const express = require('express')
const app = express()
const router = require('./routes/route')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

require('dotenv').config()

const port = process.env.PORT || 3000

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Fajar Dwi Utomo',
        url: 'fajardwiutomo75@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  }
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/user.route.js'],
  }
  
  const swaggerSpec = swaggerJSDoc(options)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/API/v1/', router)

app.listen(port, () => {
    console.log(`App Listeming on port ${port}`)
})
