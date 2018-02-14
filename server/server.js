import React from 'react';
import fs from 'fs';
import express from 'express';

import App from '../src/App.js';

import { renderToNodeStream, renderToString }  from 'react-dom/server';

const app = new express();


app.use('/static', express.static(__dirname + '/../build/static'));
app.use('/favicon.ico', express.static(__dirname + '/../build/favicon.ico'));

app.get('/', (req, res) => {

  fs.readFile(__dirname + '/../build/index.html', 'utf8', function(err, data) {
    if (err) throw err;

    let [begining, end] = data.split("<div id=\"root\"></div>");

    res.write(begining);
    res.write("<div id='root'>");
    const stream = renderToNodeStream(<App/>);
    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.write("</div>");
      res.write(end);
      res.end();
    });

  });

});

app.listen(3030, () => console.log('Example app listening on port 3030!'));
