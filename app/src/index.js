import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { MyStoreProvider } from './context/myStore';
import { Service_worker } from './cache/Service_workers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <MyStoreProvider>
    <App />
  </MyStoreProvider>
  </BrowserRouter>
  </React.StrictMode>
);

