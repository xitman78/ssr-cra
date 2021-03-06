import React from 'react';
import express from 'express';
import { renderToNodeStream, renderToString }  from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import counterApp from '../src/reducers';
import App from '../src/App.js';
import theme from '../src/theme';
import getRouteMeta from '../src/routes';

const app = new express();


app.use('/static', express.static(__dirname + '/../build/static'));
app.use('/favicon.ico', express.static(__dirname + '/../build/favicon.ico'));

app.get('*', (req, res) => {

  const assets = require(__dirname + '/../build/asset-manifest.json');

  console.log('req.url', req.url);

  const context = {};

  const sheetsRegistry = new SheetsRegistry();

  const generateClassName = createGenerateClassName();

  const store = createStore(counterApp);

  const  begining =
`<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>${getRouteMeta(req.url).title}</title>
    <link href="${assets['main.css']}" rel="stylesheet">
</head>
<body><noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">`;

  res.write(begining);

  const stream = renderToNodeStream(
    <StaticRouter location={req.url} context={context}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Provider store={store}>
            <App />
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );

  stream.pipe(res, { end: false });

  stream.on('end', () => {

    const css = sheetsRegistry.toString();

    const preloadedState = store.getState();

    res.write(`</div><style id="jss-server-side">${css}</style>`);

    const end =
`<script type="text/javascript" src="${assets['main.js']}"></script>
<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
  </script>
</body>
</html>`;

    res.write(end);
    res.end();
 });


});

app.listen(3030, () => console.log('Example app listening on port 3030!'));
