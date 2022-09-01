import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AppRootStateType, store} from './Redux/redux-store'
import {Provider} from 'react-redux';
import {Store} from 'redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const renderTree = (state: Store<AppRootStateType, any>) => {

    root.render(
        <BrowserRouter>
            <Provider store={ state }>
                <App/>
            </Provider>
        </BrowserRouter>
    );
}

store.subscribe(() => {
    renderTree(store);
})
renderTree(store);