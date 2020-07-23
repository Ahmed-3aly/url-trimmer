import { action, computed, observable } from 'mobx';
import { abstractTrimUri } from '../api';
import { urlViewPersist as Persist } from '../persist';
import { config, overlayIconEnum } from '../utils';
import { IStateBase } from './IStateBase';

export enum viewStyleEnum {
	list = 'List',
	grid = 'Grid',
}

export interface IUrlViewPersistingState {
	readonly index: number,
	readonly perPage: number,
	readonly style: viewStyleEnum,
}

export interface IUrlViewModel {
	address: string,
	trimmed: string,
}

export interface IUrlViewPage {
	readonly index: number,
	readonly count: number,
	readonly list: IUrlViewModel[],
}

export interface IPagingBinding {
	canPrev: boolean,
	canNext: boolean,
	prev: number,
	next: number,
	label: string,
}

export interface IUrlViewState extends
	IStateBase,
	IUrlViewPage,
	IUrlViewPersistingState
{
	readonly pagingBinding: IPagingBinding,
	readonly isEmpty: boolean,
	readonly isList: boolean,
	readonly isGrid: boolean,
	readonly styleNames: viewStyleEnum[],
	readonly styleIcons: overlayIconEnum[],
	readonly viewKeys: string[],
	readonly pagingSizes: number[],
	readonly pagingIcons: overlayIconEnum[],
	init: (
		index?: number,
		perPage?: number,
	) => void,
	setStyle: (
		style: viewStyleEnum,
	) => void,
	setPerPage: (
		api: abstractTrimUri,
		forceUpdate: boolean,
		perPage: number,
	) => void,
	setIndex: (
		api: abstractTrimUri,
		forceUpdate: boolean,
		index: number,
		count: number,
		list: IUrlViewModel[],
	) => void,
}

export class urlViewState
	implements IUrlViewState
{
	readonly viewKeys = [
		'Full Address',
		'Trimmed Address',
	];
	readonly pagingIcons = [
		overlayIconEnum.LeftDouble,
		overlayIconEnum.LeftSingle,
		overlayIconEnum.RightSingle,
		overlayIconEnum.RightDouble,
	];
	readonly styleNames = [
		viewStyleEnum.list,
		viewStyleEnum.grid,
	];
	readonly styleIcons = [
		overlayIconEnum.ShowList,
		overlayIconEnum.ShowGrid,
	];
	readonly pagingSizes = [
		5,
		10,
		15,
		20,
	];
	@computed
	get pagingBinding() {
		const index = this.index;
		const count = this.count;
		const canPrev = index > 1;
		const prev = index - 1;
		const canNext = index < count;
		const next = index + 1;
		let label = '1st page';
		if (count > 1) {
			label = index + ' of ' + count + ' pages';
		}
		const binding: IPagingBinding = {
			canPrev,
			canNext,
			prev,
			next,
			label,
		};
		return binding;
	}
	@computed
	get isEmpty() {
		if (this.list.length < 1) {
			return true;
		}
		return false;
	}
	@computed
	get isList() {
		if (this.list.length < 1) {
			return false;
		}
		return this.style === viewStyleEnum.list;
	}
	@computed
	get isGrid() {
		if (this.list.length < 1) {
			return false;
		}
		return this.style === viewStyleEnum.grid;
	}
	@observable
	style = viewStyleEnum.list;
	@observable
	perPage = 0;
	@observable
	index = 1;
	@observable
	count = 0;
	@observable
	list: IUrlViewModel[] = [];
	reset() {
		this.init();
	}
	@action
	init(
		index?: number,
		perPage?: number,
		style?: viewStyleEnum,
	) {
		if (!(
			index &&
			perPage &&
			style
		)) {
			const e = Persist.get();
			if (e &&
				e.index &&
				e.perPage &&
				e.style
			) {
				index = e.index;
				perPage = e.perPage;
				style = e.style;
			}
			else {
				index = 1;
				perPage = config.PAGE_SIZE;
				style = viewStyleEnum.list;
			}
		}
		this.index = index;
		this.perPage = perPage;
		this.style = style;
		this.persist();
	}
	@action
	setStyle(
		style: viewStyleEnum,
	) {
		if (this.style === style) {
			return;
		}
		this.style = style;
		this.persist();
	}
	@action
	setPerPage(
		api: abstractTrimUri,
		forceUpdate: boolean,
		perPage: number,
	) {
		this.perPage = perPage;
		this.persist();
		if (!forceUpdate) {
			return;
		}
		api.getPageAsync();
	}
	@action
	setIndex(
		api: abstractTrimUri,
		forceUpdate: boolean,
		index: number,
		count: number,
		list: IUrlViewModel[],
	) {
		this.index = index;
		this.count = count;
		this.list = list;
		this.persist();
		if (!forceUpdate) {
			return;
		}
		api.getPageAsync();
	}
	private persist() {
		Persist.set({
			index: this.index,
			perPage: this.perPage,
			style: this.style,
		});
	}
	constructor() {
		this.init();
	}
}
