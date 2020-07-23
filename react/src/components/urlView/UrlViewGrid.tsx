import React from 'react';
import { IUrlViewModel, Store } from '../../state';

export const UrlViewGrid = (v: IUrlViewModel[]) => (
	<div
		className='urlViewGrid'
	>
		{v.map((x, i) => (
			<div
				key={i}
			>
				<div
					className='urlViewLabel'
				>
					{Store.urlView.viewKeys[0]}
				</div>
				<input
					type='text'
					readOnly={true}
					value={x.address}
				/>
				<div
					className='urlViewLabel'
				>
					{Store.urlView.viewKeys[1]}
				</div>
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
