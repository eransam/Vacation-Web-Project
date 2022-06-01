import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import interceptorsService from './service/InterceptorsService';
import Layout from './Components/LayoutArea/Layout/Layout';
import HomeEnter from './Components/HomeArea/homeEnter/homeEnter';

import './index.css';
import Routing from './Components/LayoutArea/Routing/Routing';



interceptorsService.createInterceptors();




ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <Routing />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
