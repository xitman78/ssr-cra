import React from 'react';
import fs from 'fs';
import express from 'express';

import { renderToNodeStream }  from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../src/App.js';

const app = new express();


app.use('/static', express.static(__dirname + '/../build/static'));
app.use('/favicon.ico', express.static(__dirname + '/../build/favicon.ico'));

app.get('*', (req, res) => {

  fs.readFile(__dirname + '/../build/index.html', 'utf8', function(err, data) {
    if (err) throw err;

    const context = {};

    let [ begining, end ] = data.split("<div id=\"root\">");

    if (!begining) throw "Invalid index.html";

    res.write(begining);
    res.write("<div id=\"root\">");

    const stream = renderToNodeStream(<StaticRouter location={req.url} context={context}><App/></StaticRouter>);

    stream.pipe(res, { end: false });
      stream.on('end', () => {
        res.write(end);
        res.end();
      });

    // if (context.url) {
    //   console.log('context.url', context.url);
    //   res.writeHead(301, {
    //     Location: context.url
    //   })
    //   res.end()
    // } else {

    // }

  });

});

app.listen(3030, () => console.log('Example app listening on port 3030!'));
