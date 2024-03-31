import React from 'react';
import "antd/dist/reset.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import reportWebVitals from "./reportWebVitals";

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render( 
       <Provider store={store}>
        <React.StrictMode>
        <App />
        </React.StrictMode>
        </Provider>
    );
reportWebVitals();  

    // const root = ReactDOM.createRoot(document.getElementById('root'));
    // root.render(
    //     <Provider store={store}>
    //       <App />
    //      </Provider>
    //   );

  


