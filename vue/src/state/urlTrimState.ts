import { action, computed, observable } from 'mobx';
import { urlTrimPersist as Persist } from '../persist';
import { ajaxStateEnum } from './ajaxState';
import { IStateBase } from './IStateBase';
import { Store } from './store';

export interface IUrlTrimPersistingState {
	readonly text: string,
	readonly trim: string,
}

export interface IUrlTrimState extends
	IStateBase,
	IUrlTrimPersistingState
{
	readonly labels: string[],
	readonly showTrim: boolean,
	readonly disableEdit: boolean,
	readonly disableTrim: boolean,
	setText: (
		text: string,
	) => void,
	setTrim: (
		trim: string,
	) => void,
	init: (
		text?: string,
		trim?: string,
	) => void,
}

export class urlTrimState
	implements IUrlTrimState
{
	readonly labels = [
		'Enter address to minify',
		'Address to minify!',
	];
	isInit() {
		return Store.ajax.state === ajaxStateEnum.Init;
	}
	@computed
	get disableEdit() {
		return (this.trim.length > 0) || !this.isInit();
	}
	@computed
	get showTrim() {
		return (this.trim.length > 0);
	}
	@computed
	get disableTrim() {
		return (this.trim.length > 0) || !(this.text.length > 0 && this.isInit());
	}
	@observable
	text: string = '';
	@observable
	trim: string = '';
	reset() {
		this.init();
	}
	@action
	setText(
		text: string,
	) {
		this.trim = '';
		this.text = text;
		this.persist();
	}
	@action
	setTrim(
		trim: string,
	) {
		this.trim = trim;
		this.persist();
	}
	init(
		text: string = '',
		trim: string = '',
	) {
		if (!(
			text &&
			trim
		)) {
			let e = Persist.get();
			if (e && e.text) {
				text = e.text;
				if (e.trim) {
					trim = e.trim;
				}
			}
		}
		this.setText(text);
		this.setTrim(trim);
	}
	persist() {
		Persist.set({
			text: this.text,
			trim: this.trim,
		});
	}
	constructor() {
		this.init();
	}
}
