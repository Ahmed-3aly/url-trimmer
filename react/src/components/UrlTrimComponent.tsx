import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { trimUrlApi } from '../api';
import { IStore, Store } from '../state';

@inject('urlTrim')
@observer
export class UrlTrimComponent extends
	React.Component<IStore>
{
	textChange(
		text: string,
	) {
		Store.urlTrim.setTrim('');
		if (!(
			text &&
			text.trim()
		)) {
			text = '';
		}
		Store.urlTrim.setText(text);
	}
	onReset() {
		Store.ajax.init();
		Store.urlTrim.setText('');
		this.forceUpdate();
	}
	render() {
		const p = this.props.urlTrim;
		if (!p) {
			return null;
		}
		const api = trimUrlApi(Store);
		return (
			<div
				className='urlTrim'
			>
				<input
					type='text'
					placeholder={p.labels[0]}
					value={p.text}
					onChange={(e) => this.textChange(e.target.value)}
					disabled={p.disableEdit}
					title={p.labels[1].toUpperCase()}
				/>
				<button
					type='submit'
					onClick={() => api.trimUriAsync()}
					disabled={p.disableTrim}
				>
					Trim
				</button>
				{p.showTrim && (
					<Link
						to={p.trim}
					>
						{p.trim}
					</Link>
				)}
				{p.showTrim && (
					<button
						onClick={() => this.onReset()}
					>
						Clear
					</button>
				)}
			</div>
		);
	}
}
