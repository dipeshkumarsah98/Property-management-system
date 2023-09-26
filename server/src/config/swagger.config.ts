import swaggerJsdoc from 'swagger-jsdoc';
import env from './env.config';

// eslint-disable-next-line prefer-destructuring
const PORT = env.PORT;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phasezero API with Swagger',
      version: '1.0.0',
      description:
        'Phasezero is a robust and scalable e-commerce backend developed to cater specifically to the needs of an online clothing store specializing in branded apparel',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/swagger-ui/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
