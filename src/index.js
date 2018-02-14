import React from 'react';
import { hydrate } from "react-dom"
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom'

hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));