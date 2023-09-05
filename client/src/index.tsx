import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/main.scss';
import { Provider } from 'react-redux';
import App from './App/App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
