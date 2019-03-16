import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/normalize.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from './models';

const store = init({
  models,
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

