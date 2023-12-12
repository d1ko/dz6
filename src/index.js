import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import store from './api/store';
import App from './App';

createRoot().render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
