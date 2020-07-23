import { ajaxStateEnum, IUrlViewModel, IUrlViewPage, Store, IStore } from '../state';
import { config, sleepAsync } from '../utils';

export interface IPageRequest {
    index: number,
    perPage: number,
}

export interface IApiResult<T> {
    ok: boolean,
    error?: string,
    payload?: T,
}

export abstract class abstractTrimUri
{
    private readonly _store: IStore;
    constructor(
        store: IStore,
    ) {
        this._store = store;
    }
    private async _timeOutAsync() {
        const ajax = Store.ajax;
        let delay = 0;
        switch (ajax.state) {
            case ajaxStateEnum.Error:
                delay = config.ERROR_DELAY;
                break;
            case ajaxStateEnum.Success:
                delay = config.TRIM_DELAY;
                break;
            default:
                break;
        }
        await sleepAsync(delay);
        ajax.init();
    }
    protected abstract _trimUriAsync(
        address: string,
    ): Promise<IApiResult<IUrlViewModel>>;
    protected abstract _getPageAsync(
        request: IPageRequest,
    ): Promise<IApiResult<IUrlViewPage>>;
    async trimUriAsync() {
        const { ajax, urlTrim: trim } = this._store;
        if (!(ajax && trim)) {
            return;
        }
        ajax.setState(ajaxStateEnum.Progress);
        trim.setTrim('');
        if (!(
            trim.text &&
            trim.text.trim()
        )) {
            ajax.setError('Invalid input');
            return;
        }
        const addr = trim.text.trim();
        const e = await this._trimUriAsync(
            addr,
        );
        if (!(
            e.ok &&
            e.payload
        )) {
            ajax.setError(e.error);
            await this._timeOutAsync();
            return;
        }
        const c = e.payload as IUrlViewModel;
        trim.setTrim(c.trimmed);
        ajax.setState(ajaxStateEnum.Success);
        await this._timeOutAsync();
        trim.setText('');
        ajax.setState(ajaxStateEnum.Init);
        return;
    }
    async getPageAsync(
        index?: number,
    ) {
        const { ajax, urlView: view } = this._store;
        if (!(ajax && view)) {
            return;
        }
        ajax.setState(ajaxStateEnum.Progress);
        if (!index) {
            index = view.index;
        }
        if (index < 1) {
            index = 1;
        }
        view.setIndex(
            this,
            false,
            1,
            0,
            [],
        );
        const data: IPageRequest = {
            index,
            perPage: view.perPage,
        };
        const e = await this._getPageAsync(
            data,
        );
        if (!(
            e.ok &&
            e.payload
        )) {
            ajax.setError(e.error);
            await sleepAsync(config.ERROR_DELAY);
            ajax.setState(ajaxStateEnum.Init);
            return;
        }
        const c = e.payload as IUrlViewPage;
        view.setIndex(
            this,
            false,
            c.index,
            c.count,
            c.list,
        );
        ajax.setState(ajaxStateEnum.Init);
        return;
    }
}
