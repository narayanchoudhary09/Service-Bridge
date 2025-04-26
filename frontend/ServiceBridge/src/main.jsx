import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import rootReducer from "./reducer/index";
import { configureStore } from "@reduxjs/toolkit"
import ProviderQueryClient from './providers.jsx';

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ProviderQueryClient>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ProviderQueryClient>
  </>,
)
