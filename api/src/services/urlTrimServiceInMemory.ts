import { urlTrimServiceAbstract } from './urlTrimServiceBase';
import { IUrlTrimEntity } from '../entities';
import { generatorService } from './generatorService';
import { config } from '../utils';

const seedDomains = [
    'http://Google.com/',
    'http://yahoo.com/',
    'http://apple.com/',
    'http://microsoft.com/',
    'http://amazon.com/',
];

export class urlTrimServiceInMemory
    extends urlTrimServiceAbstract
{
    private _list: IUrlTrimEntity[];
    async _seedData() {
        this._list = [];
        if (!config.DB_IN_MEMORY)
        {
            return;
        }
        for (let i = 0; i < seedDomains.length; i++) {
            const first = i === 0;
            const limit = first ? 1 : 10;
            for (let j = 0; j < limit; j++) {
                const prefix = seedDomains[i];
                let suffix = '';
                if (!first) {
                    suffix = generatorService.generate(8);
                }
                const address = prefix + suffix;
                await this.trimUrlAsync(address);
            }
        }
    }
    constructor() {
        super();
        this._seedData();
    }
    protected _countAsync(): Promise<number> {
        let c = 0;
        if (this._list) {
            c = this._list.length;
        }
        return Promise.resolve(c);
    }
    protected _getRangeAsync(
        skip: number,
        take: number,
    ): Promise<IUrlTrimEntity[]>
    {
        take += skip;
        const list = this._list.slice(skip, take);
        return Promise.resolve(list);
    }
    protected _findByAddressAsync(
        address: string,
    ): Promise<IUrlTrimEntity> {
        const find = this._list.find(
            x => x.address.toLowerCase() === address.toLowerCase()
        );
        if (!find) {
            throw new Error('-');
        }
        return Promise.resolve(find);
    }
    protected _codeExistsAsync(
        trimmed: string,
    ): Promise<boolean> {
        const find = this._list.find(
            x => x.trimmed === trimmed
        );
        let s = false;
        if (find) {
            s = true;
        }
        return Promise.resolve(s);
    }
    protected _appendAsync(
        data: IUrlTrimEntity,
    ): Promise<IUrlTrimEntity> {
        this._list.push(data);
        return Promise.resolve(data);
    }
}
