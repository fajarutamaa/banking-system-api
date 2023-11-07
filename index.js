const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const app = express()
const router = require('./routes/route')
const swaggerUI = require('swagger-ui-express')
const { swaggerDefinition } = require('./helper/swagger.define')

require('dotenv').config()

const port = process.env.PORT || 3000

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './routes/user.route.js',
    './routes/account.route.js',
    './routes/transaction.route.js',
  ],
}

const swaggerSpec = swaggerJSDoc(options)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/API/v1/', router)

app.listen(port, () => {
  console.log(`App Listening on port ${port}`)
})


module.exports = app