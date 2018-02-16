import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import { routes } from './routes';

import './App.css';

import Counter from './Counter';

const Home = () => (
  <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
  </p>
);

const NoMatch = () => (
  <p className="App-intro">
      <Helmet>
          <title>{routes['404'].title}</title>
      </Helmet>
      Not found!!!
  </p>
);

class App extends Component {

  componentDidMount() {
    console.log('App Component mounted!!!');
  }

  render() {
    console.log('render');
    return (
        <div className="App">
          <Helmet>
              <title>{routes['/'].title}</title>
              <meta name="Server Side Render App" content="React Application" />
          </Helmet>
          <header className="App-header">
            <img src="/static/media/logo.svg" className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <hr/>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/counter">Counter</Link>
          <hr/>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/counter" component={Counter} />
            <Route component={NoMatch} />
          </Switch>
        </div>
    );
  }
}

export default App;
