import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactionsProvider } from "./features/posts/reactionsContext"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ReactionsProvider>
      <Router>
        <Routes>
          <Route path="/*" element={ <App />} />
        </Routes>
      </Router>
      </ReactionsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
