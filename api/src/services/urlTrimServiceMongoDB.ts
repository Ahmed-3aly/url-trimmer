import { IUrlTrimEntity } from '../entities';
import { trimUrl as m } from '../schemas';
import { urlTrimServiceAbstract } from './urlTrimServiceBase';

class UrlTrimServiceMongoDB
    extends urlTrimServiceAbstract
{
    private _sanitizeDoc(
        v: any,
    ): IUrlTrimEntity {
        return {
            address: v.address,
            trimmed: v.trimmed,
        };
    }
    private _sanitizeDocs(
        v: any[],
    ): IUrlTrimEntity[] {
        return v.map(
            x => this._sanitizeDoc(x)
        );
    }
    protected async _countAsync(
        //
    ): Promise<number | undefined>
    {
        try {
            const e = await m
                .countDocuments({})
                .exec();
            return e;
        }
        catch (x) {
            return;
        }
    }
    protected async _getRangeAsync(
        skip: number,
        take: number,
    ): Promise<IUrlTrimEntity[]>
    {
        let list: IUrlTrimEntity[] = [];
        try {
            const e = await m
                .find()
                .skip(skip)
                .limit(take)
                .exec();
            return this._sanitizeDocs(e);
        }
        catch (x) {
            return list;
        }
    }
    protected async _findByAddressAsync(
        address: string,
    ): Promise<IUrlTrimEntity | undefined>
    {
        try {
            const e = await m
                .findOne(
                    {
                        address: {
                            $regex: new RegExp(address, 'i')
                        },
                    },
                ).exec();
            return this._sanitizeDoc(e);
        }
        catch (x) {
            return;
        }
    }
    protected async _codeExistsAsync(
        trimmed: string,
    ): Promise<boolean>
    {
        try
        {
            const e = await m
                .countDocuments
                (
                    {
                        trimmed: {
                            $regex: new RegExp(trimmed)
                        },
                    },
                )
                .exec();
            return e > 0;
        }
        catch (x) {
            return false;
        }
    }
    protected async _appendAsync(
        data: IUrlTrimEntity,
    ): Promise<IUrlTrimEntity | undefined>
    {
        try {
            const e = await m
                .create(data);
            const s = this._sanitizeDoc(e);
            return s;
        }
        catch (x) {
            return;
        }
    }
}

export const urlTrimServiceMongoDB = new UrlTrimServiceMongoDB();
