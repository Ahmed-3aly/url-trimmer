import { config } from '../utils';
import { ajaxTrimUriApi } from './trimUrlApiAjax';
import { mockTrimUriApi } from './trimUrlApiMock';
import { IStore } from '../state';
export * from './trimUrlApi';

export const trimUrlApi = (
    store: IStore,
) => {
    if (config.MOCK_API) {
        return new mockTrimUriApi(store);
    }
    return new ajaxTrimUriApi(store);
};
