import { config } from './config';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

export function configureSwagger(
    app: any,
) {
    app.use(
        `/${config.SWAGGER}/index.html/`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument),
    );
};
