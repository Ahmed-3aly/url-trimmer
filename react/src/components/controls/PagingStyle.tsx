import { inject, observer } from 'mobx-react';
import React from 'react';
import { IStore } from '../../state';
import { OverlayButton } from './OverlayButton';

@inject('urlView')
@observer
export class PagingStyle extends
	React.Component<IStore>
{
	render() {
		const p = this.props.urlView;
		if (!p) {
			return null;
		}
		return (
			<div
				className='pagingStyle'
			>
				<span>
					Style
				</span>
				{p.styleNames.map((x, i) => (
					<OverlayButton
						key={x}
						disabled={x === p.style}
						toolTip={x + ' View'}
						icon={p.styleIcons[i]}
						onClick={() => p.setStyle(x)}
					/>
				))}
			</div>
		);
	}
}

