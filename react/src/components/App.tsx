import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AjaxState, AppSections } from './controls';

export const App = () => (
	<BrowserRouter>
		<React.Fragment>
			<AjaxState />
			<AppSections />
		</React.Fragment>
	</BrowserRouter>
);
