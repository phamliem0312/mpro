const swaggerAutogen = require('swagger-autogen')()
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const app = express()

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
  },
  host: "localhost:8101",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "User",
      "description": "Endpoints"
    }
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",       // can be "header", "query" or "cookie"
      name: "X-API-KEY",  // name of the header, query parameter or cookie
      description: "any description..."
    }
  },
  definitions: {
    Parents: {
      father: "Simon Doe",
      mother: "Marie Doe"
    },
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        $ref: '#/definitions/Parents'
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company"
          }
        }
      ]
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: ""
    }
  }
}

swaggerAutogen('./swagger-output.json', ['./index.js'], doc)
  .then(() => {
    const swaggerFile = require('./swagger-output.json')
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.listen(8300, () => {
      console.log("Server is running!\nAPI documentation: http://localhost:8300/doc")
    })
})