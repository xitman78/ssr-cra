import React from 'react';
import fs from 'fs';
import express from 'express';

import { renderToNodeStream, renderToString }  from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';

import App from '../src/App.js';

import theme from '../src/theme';

const app = new express();


app.use('/static', express.static(__dirname + '/../build/static'));
app.use('/favicon.ico', express.static(__dirname + '/../build/favicon.ico'));

app.get('*', (req, res) => {

  fs.readFile(__dirname + '/../build/index.html', 'utf8', function(err, data) {
    if (err) throw err;

    const context = {};

    const sheetsRegistry = new SheetsRegistry();

    const generateClassName = createGenerateClassName();

    let [ begining, end ] = data.split("<div id=\"root\"></div>");

    if (!begining) throw "Invalid index.html";

    res.write(begining);
    res.write("<div id=\"root\">");

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
        console.log('sheetsRegistry', sheetsRegistry);
        res.write(`</div><style id="jss-server-side">${css}</style>`);
        res.write(end);
        res.end();
   });

  });

});

app.listen(3030, () => console.log('Example app listening on port 3030!'));
