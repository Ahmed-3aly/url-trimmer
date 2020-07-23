import { inject, observer } from 'mobx-react';
import React from 'react';
import { trimUrlApi } from '../../api';
import { IStore, Store, IUrlViewState, IPagingBinding } from '../../state';
import { OverlayButton } from './OverlayButton';

const api = trimUrlApi(Store);

const pagingControls = (
	p: IUrlViewState,
	b: IPagingBinding,
) => (
	<React.Fragment>
		<OverlayButton
			toolTip='first'
			disabled={!b.canPrev}
			icon={p.pagingIcons[0]}
			onClick={() => api.getPageAsync(1)}
		/>
		<OverlayButton
			toolTip='previous'
			disabled={!b.canPrev}
			icon={p.pagingIcons[1]}
			onClick={() => api.getPageAsync(b.prev)}
		/>
		<span>
			{b.label}
		</span>
		<OverlayButton
			toolTip='next'
			disabled={!b.canNext}
			icon={p.pagingIcons[2]}
			onClick={() => api.getPageAsync(b.next)}
		/>
		<OverlayButton
			toolTip='last'
			disabled={!b.canNext}
			icon={p.pagingIcons[3]}
			onClick={() => api.getPageAsync(p.count)}
		/>

	</React.Fragment>
);

@inject('urlView')
@observer
export class PagingIndex extends
	React.Component<IStore>
{
	render() {
		const p = this.props.urlView;
		let renderControls = false;
		if ((
			p &&
			p.count > 1 &&
			p.pagingBinding
		)) {
			renderControls = true;
		}
		const a = p as any;
		return (
			<div
				className={'pagingIndex'}
			>
				{renderControls && pagingControls(
					a,
					a.pagingBinding
				)}
			</div>
		)
	}
}
