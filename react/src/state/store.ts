import { configure, observable } from 'mobx';
import { ajaxState, IAjaxState } from './ajaxState';
import { IStateBase } from './IStateBase';
import { IUrlTrimState, urlTrimState } from './urlTrimState';
import { IUrlViewState, urlViewState } from './urlViewState';

configure({
	enforceActions: 'observed',
	computedRequiresReaction: true,
});

export interface IStore {
	ajax?: IAjaxState,
	urlTrim?: IUrlTrimState,
	urlView?: IUrlViewState,
}

export interface IStoreBind extends
	IStateBase
{
	ajax: IAjaxState,
	urlTrim: IUrlTrimState,
	urlView: IUrlViewState,
}

class StoreBind implements
	IStore,
	IStoreBind
{
	@observable
	ajax!: IAjaxState;
	@observable
	urlTrim!: IUrlTrimState;
	@observable
	urlView!: IUrlViewState;
	constructor() {
		this.ajax = new ajaxState();
		this.urlTrim = new urlTrimState();
		this.urlView = new urlViewState();
		this.reset();
	}
	reset() {
		this.ajax.reset();
		this.urlTrim.reset();
		this.urlView.reset();
	};
}

export const Store = new StoreBind();
