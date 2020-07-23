import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { trimUrlRoutes } from './routes';
import { connectToDbAsync, configureSwagger, log, config } from './utils';

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

connectToDbAsync()
    .then(x => onConnectionDone(x));

function onConnectionDone(
    success: boolean,
) {
    const server = app.listen(config.LISTEN_PORT);
    if (!success) {
        // gracefully terminate
        server.close();
        return;
    }
    trimUrlRoutes(app);
    configureSwagger(app);
    log(`server -> listening on ${config.LISTEN_PORT}`);
}
