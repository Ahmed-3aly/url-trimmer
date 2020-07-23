import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import { IRouted } from '../../index';
import { appRoutes, IRenderers } from '../../utils';
import { UrlTrimComponent } from '../UrlTrimComponent';
import { UrlViewComponent } from '../UrlViewComponent';

const renderers: IRenderers = {
	urlTrim: UrlTrimComponent,
	urlView: UrlViewComponent,
};

const AppSectionsComponent = (
	p: IRouted,
) => {
	let activePath = '';
	if (p &&
		p.location &&
		p.location.pathname
	) {
		activePath = p
			.location
			.pathname
			.toLowerCase();
	}
	const keys = appRoutes.map(x => '/' + x.href.toLowerCase());
	const find = keys.indexOf(activePath);
	let active = 0;
	if (find > -1) {
		active = find;
	}
	let links: any[] = [];
	let routes: any[] = [];
	for (let i = 0; i < appRoutes.length; i++) {
		const isFirst = i < 1;
		const isActive = i === active;
		const j = appRoutes[i];
		const render = renderers[j.href];
		const href = '/' + j.href;
		let path = href;
		if (isFirst) {
			path = '*';
		}
		let className = '';
		if (isActive) {
			className = 'router-link-active';
		}
		links.push(
			<Link
				key={i}
				to={href}
				className={className}
			>
				{j.label}
			</Link>
		);
		routes.push(
			<Route
				key={i}
				path={path}
				component={render}
			/>
		);
	}
	routes.reverse();
	return (
		<React.Fragment>
			<div
				className='nav'
			>
				{links}
			</div>
			<div
				className='navContent'
			>
				<Switch>
					{routes}
				</Switch>
			</div>
		</React.Fragment>
	);
};

export const AppSections = withRouter(
	AppSectionsComponent
);
