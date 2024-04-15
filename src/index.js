import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


import Reducer from './Reducer'
import {createStore} from 'redux';
import { Provider} from 'react-redux';
import Mazzika from './Mazzika';

import { BrowserRouter } from 'react-router-dom';

const store = createStore(Reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Mazzika />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
);
reportWebVitals();
