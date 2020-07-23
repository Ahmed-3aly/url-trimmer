import { inject, observer } from 'mobx-react';
import React from 'react';
import { IStore, Store } from '../../state';
import { Button } from '../controls';
import { trimUrlApi } from '../../api';

@inject('urlView')
@observer
export class PagingSize extends
	React.Component<IStore>
{
	print(
		v: number
	) {
		let x = v.toString();
		if (x.length < 2) {
			x += '0' + x;
		}
		return x;
	}
	toolTip(
		v: number
	) {
		return this.print(v) + ' items per page';
	}
	render() {
		const p = this.props.urlView;
		if (!p) {
			return null;
		}
		const api = trimUrlApi(Store);
		return (
			<div
				className='pagingSize'
			>
				<span>
					Size
				</span>
				{p.pagingSizes.map((x, i) => {
					return (
						<Button
							key={i}
							toolTip={this.toolTip(x)}
							disabled={x === p.perPage}
							onClick={() => p.setPerPage(api, true, x)}
						>
							{x}
						</Button>
					);
				})}
			</div>
		);
	}
}
