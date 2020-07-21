import { applyMiddleware, compose, createStore } from 'redux';

import App from '../src/App';
import { Provider } from 'react-redux';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import bodyparser from 'body-parser';
import config from './config/config';
import cookieparser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import hbs from 'hbs';
import lodgeRouter from './api/lodgereq';
import mongoose from 'mongoose';
import reducers from '../src/reducers'
import { renderToString } from 'react-dom/server';
import reqRouter from './api/pickreq';
import thunk from 'redux-thunk';
import userRouter from './api/user';

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const server = express();
const expRouter = express.Router();
const userAPI = userRouter(expRouter);
const reqAPI = reqRouter(expRouter);
const lodgeAPI = lodgeRouter(expRouter);

// print current env
console.log('current env:', env);

const dbConfig = {
  useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true,
	poolSize: 5
};

const db = mongoose.connection;
db.on('disconnected', () => {
	console.log('db disconnected, tryng to reconnect...');
	mongoose.connect(config.db, dbConfig);
});
db.on('error', () => {
	console.log('db connection error, tryng to reconnect...');
	mongoose.connect(config.db, dbConfig);
});
mongoose.connect(config.db, dbConfig);

server.set('view engine', 'html');
server.engine('html', hbs.__express);
server.use(cookieparser());
server.use(bodyparser.json());
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
})

server.use('^/$', (req, res) => {
  // render app to string
  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
      <App />
      </StaticRouter>
    </Provider>
  );

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
server.use(express.static('build-server'));
server.use('/api/user', userAPI);
server.use('/api/requests', reqAPI);
server.use('/api/lodgeRequests', lodgeAPI);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});