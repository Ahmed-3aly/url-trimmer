import { Express } from 'express-serve-static-core';
import { trimUrlController } from '../controllers';
import { config } from '../utils';

export const trimUrlRoutes = (
    app: Express,
) => app.route(config.API_PREFIX + 'trimUrl')
        .get(trimUrlController.getPageAsync)
        .post(trimUrlController.trimUrlAsync);
