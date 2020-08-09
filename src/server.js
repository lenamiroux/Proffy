// Servidor
const express = require('express');
const server = express();

const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  pageSuccess,
} = require('./pages');

// Template Engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

// Inicialização do Servidor
server
  // receber dados do req.body
  .use(express.urlencoded({ extended: true }))
  // arquivos estáticos
  .use(express.static('public'))
  //rotas da aplicação
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .post('/save-classes', saveClasses)
  .get('/page-success', pageSuccess)
  .listen(5500);
