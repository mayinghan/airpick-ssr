import express from 'express';
 import React from 'react';
 import { renderToString } from 'react-dom/server';
 import fs from 'fs';
 import App from '../common/App';
 
 const PORT = process.env.PORT || 3000;
 const server = express();
 
 server.use('^/$', (req, res) => {
   // render app to string
   const html = renderToString(<App />);
 
   fs.readFile('build/index.html', 'utf8', (err, data) => {
     if (err) {
       console.error('Something went wrong:', err);
       return res.status(500).send('Oops, better luck next time!');
     }
     // inject app`s static contents to the div with id equal root
     return res.send(
       data.replace('<div id="root"></div>', `<div id="root">${html}</div>`),
     );
   });
 });
 
 // serve contents from build directory as static files
 server.use(express.static('build'));
 
 server.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
 });