import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import { BrowserRouter } from 'react-router-dom';

import { render, hydrate } from "react-dom";

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


hydrate(<MuiThemeProvider theme={theme}><BrowserRouter><Main /></BrowserRouter></MuiThemeProvider>, document.getElementById('root'));