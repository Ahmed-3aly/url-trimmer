import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { IStore } from '../../state';
import { UrlViewEmpty } from './UrlViewEmpty';
import { UrlViewGrid } from './UrlViewGrid';
import { UrlViewList } from './UrlViewList';

@inject('urlView')
@observer
export class UrlView extends
	React.Component<IStore>
{
	render() {
		const p = this.props.urlView;
		if (!p) {
			return null;
		}
		const json = toJS(
			p.list
		);
		if (p.isGrid) {
			return UrlViewGrid(json);
		}
		if (p.isList) {
			return UrlViewList(json);
		}
		return UrlViewEmpty();
	}
}
