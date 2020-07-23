import React from 'react';
import { trimUrlApi } from '../api';
import { IStore, Store } from '../state';
import { PagingIndex, PagingSize, PagingStyle } from './controls';
import { UrlView } from './urlView';

export class UrlViewComponent extends
	React.Component<IStore>
{
	componentDidMount() {
		const api = trimUrlApi(Store);
		api.getPageAsync();
	}
	render() {
		return (
			<div
				className='urlView'
			>
				<PagingStyle />
				<PagingSize />
				<PagingIndex />
				<UrlView />
			</div>
		);
	}
}
