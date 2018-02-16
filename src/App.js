import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
} from "react-router-dom";
import { Helmet } from 'react-helmet';

import './App.css';

import Counter from './Counter';

const Home = () => (
  <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
  </p>
);

const NoMatch = () => (
  <p className="App-intro">
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
              <title>SSR App</title>
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
