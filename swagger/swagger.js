// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API',
    description: 'API Documentation',
  },
  host: 'localhost:5001',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    signupParams: {
      $username: "Artem",
      $email: "swaggertest@gmail.com",
      $password: "12345678"
    },
    loginParams: {
      $email: "swaggertest@gmail.com",
      $password: "12345678"
    }
  }
};

const outputFile = './swagger.json';
// Specify your entry point(s) that contain your endpoints (adjust the path as needed)
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger file generated. review on /api-docs');
});
