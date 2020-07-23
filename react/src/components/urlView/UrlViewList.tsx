import React from 'react';
import { IUrlViewModel, Store } from '../../state';

export const UrlViewList = (v: IUrlViewModel[]) => (
	<div
		className='urlViewList'
	>
		<div>
			<div
				className='urlViewLabel'
			>
				{Store.urlView.viewKeys[0]}
			</div>
			<div
				className='urlViewLabel'
			>
				{Store.urlView.viewKeys[1]}
			</div>
		</div>
		{v.map((x, i) => (
			<div
				key={i}
			>
				<input
					type='text'
					readOnly={true}
					value={x.address}
				/>
				<a
					className='urlViewLink'
					href={x.trimmed}
				>
					{x.trimmed}
				</a>
			</div>
		))}
	</div>
);
