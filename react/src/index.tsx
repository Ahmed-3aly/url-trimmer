import '@fortawesome/fontawesome-free/css/all.css';
import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { App } from './components';
import * as serviceWorker from './serviceWorker';
import { IStore, Store } from './state';
import './styles/ajaxState.css';
import './styles/appRoot.css';
import './styles/index.css';
import './styles/nav.css';
import './styles/pagingIndex.css';
import './styles/pagingSize.css';
import './styles/pagingStyle.css';
import './styles/urlTrim.css';
import './styles/urlView.css';
import './styles/urlViewEmpty.css';
import './styles/urlViewGrid.css';
import './styles/urlViewList.css';

export interface IStoreRouted extends IStore, IRouted { }
export interface IRouted extends RouteComponentProps<any> { }

Store.reset();

ReactDOM.render(
    <MobxProvider
        {...Store}
    >
        <App />
    </MobxProvider>,
	document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
