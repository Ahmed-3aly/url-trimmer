import { IUrlViewModel, IUrlViewPage } from '../state';
import { ajaxContentTypeEnum, ajaxMethodEnum, fetchAsync } from '../utils/ajax';
import { abstractTrimUri, IApiResult, IPageRequest } from './trimUrlApi';

const CONTROLLER = 'trimUrl';

export class ajaxTrimUriApi extends abstractTrimUri {
    async _trimUriAsync(
        addr: string,
    ) {
        let result: IApiResult<IUrlViewModel> = {
            ok: false,
        };
        try
        {
            const e = await fetchAsync(
                ajaxMethodEnum.POST,
                CONTROLLER,
                addr.trim(),
                ajaxContentTypeEnum.TEXT,
            );
            if (!(
                e.ok &&
                e.payload
            )) {
                throw new Error('Unknown error');
            }
            result.ok = true;
            result.payload = e.payload;
        }
        catch (x) {
            result.payload = x;
        }
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
            const e = await fetchAsync(
                ajaxMethodEnum.GET,
                CONTROLLER,
                request,
            );
            if (!(
                e.ok &&
                e.payload
            )) {
                throw new Error('Unknown error');
            }
            result.ok = true;
            result.payload = e.payload;
        }
        catch (x) {
            result.payload = x;
        }
        return result;
    }
}
