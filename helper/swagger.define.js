const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Banking System',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Fajar Dwi Utomo',
        url: 'https://www.instagram.com/fajar.utamaa/',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  }


  module.exports = {
    swaggerDefinition
  }