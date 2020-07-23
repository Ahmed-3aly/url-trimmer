import { urlTrimService } from '../services';
import { uriTimeServiceExceptions as XCS } from '../services/urlTrimServiceBase';
import { IUrlTrimPage, IApiResult } from '../entities';

const domain = 'http://google.com/';
const S = urlTrimService(true);

it(
    'getPageAsync "0" should throw argument exception',
    async () => {
        const f = S.getPageAsync(0);
        await expect(f).rejects.toThrow(XCS.INVALID_ARG)
    }
);

const emptyPage: IApiResult<IUrlTrimPage> = {
    ok: true,
    payload: {
        index: 0,
        count: 0,
        list: [],
    },
};

it(
    'getPageAsync(1) should return empty page',
    async () => {
        const f = S.getPageAsync(1);
        await expect(f).resolves.toMatchObject(emptyPage);
    }
);

const sixInserts = {
    ok: true,
    payload: {
        index: 1,
        count: 2,
    }
}

it(
    'getPageAsync(1, 5) should return { ok, index 1, count 2 } after 6 trimCalls',
    async () => {
        for (let i = 0; i < 6; i++) {
            await S.trimUrlAsync(domain + i);
        }
        const f = await S.getPageAsync(1, 5);
        expect(f).toMatchObject(sixInserts);
    }
);
