
export interface IRenderers {
	[href: string]: any,
}

interface IAppRoute {
	label: string,
	href: string,
}

export const appRoutes: IAppRoute[] = [
	{
		label: 'Url Trim',
		href: 'urlTrim',
	},
	{
		label: 'Url View',
		href: 'urlView',
	},
];
