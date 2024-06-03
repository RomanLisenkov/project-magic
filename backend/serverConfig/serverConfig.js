const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const ssr = require('../middlewares/render-component');
const get_user_session = require('../middlewares/get-user-session');
const path = require('path');


const sessionConfig = {
  store: new FileStore(), // typo of store which create folder "session in project"
  name: 'user_sid', // name of cookie where session id will be stored
  secret: process.env.SESSION_SECRET ?? 'secret', // word which used for
  resave: false, // resave cookie with each request
  saveUninitialized: false, // настройка сессии даже без авторизации
  cookie: {
    maxAge: 100 * 60 * 60 * 12,
    httpOnly: true,
  },
};

const serverConfig = (server) => {
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.static('public'));
  server.use('/pictures',express.static(path.join(__dirname,'../','pictures')));
  // server.use(ssr);
  server.use(session(sessionConfig));
  server.use(get_user_session);

  // !
};

module.exports = serverConfig;
