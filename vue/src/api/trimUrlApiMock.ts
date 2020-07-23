import { generatorService, urlTrimService } from '../services';
import { IUrlViewModel, IUrlViewPage } from '../state';
import { sleepAsync, config, log } from '../utils';
import { abstractTrimUri, IApiResult, IPageRequest } from './trimUrlApi';

const domains = [
    'http://yahoo.com/',
    'http://google.com/',
    'http://apple.com/',
    'http://microsoft.com/',
    'http://amazon.com/',
];

for (let i = 0; i < domains.length; i++) {
    const limit = i < 1 ? 1 : 10;
    for (let j = 0; j < limit; j++) {
        const address = domains[i] + generatorService.generate(8);
        urlTrimService.trimUrl(address);
    }
}

export class mockTrimUriApi extends abstractTrimUri {
    async _trimUriAsync(
        addr: string,
    ) {
        let result: IApiResult<IUrlViewModel> = {
            ok: false,
        };
        try 
        {
            await sleepAsync(config.MOCK_DELAY);
            const e = urlTrimService.trimUrl(addr);
            result.ok = true;
            result.payload = e;
        }
        catch (x) {
            result.payload = x;
        }
        log('trimUrlAsync', [
            'request',
            addr,
            'result',
            result,
        ]);        
        return result;
    }
    async _getPageAsync(
        request: IPageRequest,
    ) {
        let result: IApiResult<IUrlViewPage> = {
            ok: false,
        };
        try
        {
            await sleepAsync(config.MOCK_DELAY);
            const e = urlTrimService.getPage(
                request.index,
                request.perPage,
            );
            result.ok = true;
            result.payload = e;
        }
        catch (x) {
            result.payload = x;
        }
        log('getPageAsync', [
            'request',
            request,
            'result',
            result,
        ]);
        return result;
    }
}
