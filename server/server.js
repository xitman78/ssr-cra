import React from 'react';
import express from 'express';

import { renderToNodeStream, renderToString }  from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';

import App from '../src/App.js';

import theme from '../src/theme';

const app = new express();


app.use('/static', express.static(__dirname + '/../build/static'));
app.use('/favicon.ico', express.static(__dirname + '/../build/favicon.ico'));

app.get('*', (req, res) => {

  const assets = require(__dirname + '/../build/asset-manifest.json');

  // console.log('assets', assets);

  const context = {};

  const sheetsRegistry = new SheetsRegistry();

  const generateClassName = createGenerateClassName();

  const  begining =
`<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    <link href="${assets['main.css']}" rel="stylesheet">
</head>
<body><noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">`;

    const end =
`<script type="text/javascript" src="${assets['main.js']}">
</script>
</body>
</html>`;

  res.write(begining);

  const stream = renderToNodeStream(
    <StaticRouter location={req.url} context={context}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );

  stream.pipe(res, { end: false });

  stream.on('end', () => {
      const css = sheetsRegistry.toString();
      res.write(`</div><style id="jss-server-side">${css}</style>`);
      res.write(end);
      res.end();
 });


});

app.listen(3030, () => console.log('Example app listening on port 3030!'));
