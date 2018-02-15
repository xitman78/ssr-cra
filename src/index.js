import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import { BrowserRouter } from 'react-router-dom';

import { render, hydrate } from "react-dom";

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './reducers';

import './index.css';
import App from './App';
import theme from './theme';


class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      console.log('Found SSR Styles');
      //jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App {...this.props} />
  }
}

const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(counterApp, preloadedState);


hydrate(<BrowserRouter><MuiThemeProvider theme={theme}><Provider store={store}><Main /></Provider></MuiThemeProvider></BrowserRouter>, document.getElementById('root'));