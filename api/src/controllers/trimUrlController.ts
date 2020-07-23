import { Request, Response } from 'express';
import { config, logHttp } from '../utils';
import { urlTrimService } from '../services/urlTrimService';

export const trimUrlController = {
    getPageAsync,
    trimUrlAsync,
}

const svc = urlTrimService(config.DB_IN_MEMORY);

const ADDRESS_ERROR = 'index is a required parameter';
const INDEX_ERROR = 'index is a required parameter';

async function trimUrlAsync(
    request: Request,
    response: Response,
) {
    logHttp(request);
    try
    {
        let address = request.body as string;
        if (address) {
            address = address.trim();
        }
        if (!address) {
            return response
                .status(400)
                .send(ADDRESS_ERROR);
        }
        const e = await svc.trimUrlAsync(address);
        if (e.ok) {
            return response
                .status(200)
                .send(e.payload);
        }
        else {
            return response
                .status(500)
                .send(e.error);
        }
    }
    catch (error) {
        return response
            .status(500)
            .send(error);
    }
}

async function getPageAsync(
    request: Request,
    response: Response,
) {
    logHttp(request);
    try
    {
        let S = {
            index: '',
            perPage: '',
        }
        if (request.query.index) {
            S.index = request.query.index.toString().trim();
        }
        else {
            return response
                .status(400)
                .send(INDEX_ERROR);
        }
        if (request.query.perPage) {
            S.perPage = request.query.perPage.toString().trim();
        }
        else {
            S.perPage = '5';
        }
        const index = Number.parseInt(S.index);
        if (!(index && index > -1)) {
            return response
                .status(400)
                .send(INDEX_ERROR);
        }
        const perPage = Number.parseInt(S.perPage)
        const e = await svc.getPageAsync(
            index,
            perPage,
        );
        if (!e.ok) {
            throw new Error(e.error);
        }
        return response
            .status(200)
            .send(e.payload);
    }
    catch (error) {
        return response
            .status(500)
            .send(error);
    }
}
