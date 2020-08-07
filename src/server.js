// Servidor
const express = require('express');
const server = express();

const { pageLanding, pageStudy, pageGiveClasses } = require('./pages');

// Template Engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

// Inicialização do Servidor
server
  // arquivos estáticos
  .use(express.static('public'))
  //rotas da aplicação
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .listen(5500);
