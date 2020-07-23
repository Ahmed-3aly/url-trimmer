import { IUrlTrimEntity, IUrlTrimPage, IApiResult } from '../entities';
import { generatorService } from './generatorService';
import { config } from '../utils';

export interface IUrlTrimService {
    trimUrlAsync: (
        address: string
    ) => Promise<IApiResult<IUrlTrimEntity>>;
    getPageAsync: (
        index: number,
        perPage?: number,
    ) => Promise<IApiResult<IUrlTrimPage>>;
}

const NOT_FOUND = 'not found!';
const INVALID_ARG = 'invalid argument!';

export const uriTimeServiceExceptions = {
    NOT_FOUND,
    INVALID_ARG,
};

// eslint-disable-next-line
const validUrlExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export abstract class urlTrimServiceAbstract
    implements IUrlTrimService
{
    private prefixUrl(
        v: IUrlTrimEntity,
    ): IUrlTrimEntity {
        const prefix = config.URL_PREFIX;
        const { address, trimmed } = v;
        if (trimmed.toLowerCase().startsWith(prefix)) {
            return {
                address,
                trimmed,
            };
        }
        return {
            address,
            trimmed: prefix + trimmed,
        };
    }
    private isValidURL(
        v: string,
    ) {
        return v.match(validUrlExpression) !== null;
    };
    protected abstract _findByAddressAsync(
        address: string,
    ): Promise<IUrlTrimEntity | undefined>;
    protected abstract _codeExistsAsync(
        trimmed: string,
    ): Promise<boolean>;
    protected abstract _countAsync(
        //
    ): Promise<number | undefined>;
    protected abstract _getRangeAsync(
        skip: number,
        take: number,
    ): Promise<IUrlTrimEntity[]>;
    protected abstract _appendAsync(
        data: IUrlTrimEntity,
    ): Promise<IUrlTrimEntity | undefined>;
    async trimUrlAsync(
        address: string,
    ) {
        let e: IApiResult<IUrlTrimEntity> = {
            ok: false,
        };
        if (!(
            address &&
            address.trim()
        )) {
            e.error = INVALID_ARG;
            return e;
        }
        if (!this.isValidURL(address)) {
            e.error = INVALID_ARG;
            return e;
        }
        try {
            let find = await this._findByAddressAsync(address);
            if (!find) {
                throw new Error(NOT_FOUND);
            }
            find = this.prefixUrl(find);
            e.ok = true;
            e.payload = find;
            return e;
        }
        catch (error) {

        }
        let trimmed = '';
        do {
            trimmed = generatorService.generate(
                config.URL_SUFFIX
            );
            if (!await this._codeExistsAsync(trimmed)) {
                break;
            }
        } while (true);
        try {
            let data = await this._appendAsync({
                address,
                trimmed,
            });
            if (!data) {
                throw new Error(NOT_FOUND);
            }
            data = this.prefixUrl(data);
            e.ok = true;
            e.payload = data;
            return e;
        }
        catch (error) {
            e.error = error;
            return e;
        }
    }
    async getPageAsync(
        index: number,
        perPage?: number,
    ) {
        if (index < 1) {
            throw new Error(INVALID_ARG);
        }
        if (!perPage) {
            perPage = 5;
        }
        let e: IApiResult<IUrlTrimPage> = {
            ok: false,
        };
        try {
            const match = await this._countAsync();
            if (match === null || match === undefined) {
                throw new Error(NOT_FOUND);
            }
            if (match < 1) {
                e.ok = true;
                e.payload = {
                    index: 1,
                    count: 1,
                    list: [],
                };
            }
            const pages = match / perPage;
            const count = Math.ceil(pages);
            if (index > count)
            {
                index = count;
            }
            let skip = 0;
            let take = perPage;
            if (index > 1)
            {
                skip = ((index - 1) * perPage);
            }
            while (match < (skip + take)) {
                take--;
            }
            let list = await this._getRangeAsync(
                skip,
                take,
            );
            list = list.map(x => this.prefixUrl(x));
            const page: IUrlTrimPage = {
                index,
                count,
                list,
            }
            e.ok = true;
            e.payload = page;
        }
        catch (error) {
            e.error = error;
        }
        return e;
    }
}
