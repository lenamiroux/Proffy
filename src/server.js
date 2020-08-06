// Dados
const proffys = [
  {
    name: 'Diego Fernandes',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
    whatsapp: '11 999323232',
    bio:
      'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    subject: 'Química',
    cost: 20.0,
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: 'Helena Simões',
    avatar:
      'https://avatars1.githubusercontent.com/u/12610282?s=460&u=d40cb76ad3ab4c9d431a3d89a84e40f3832273e4&v=4',
    whatsapp: '11 999887766',
    bio:
      'Designer de formação, hacker na vida. Só sei que nada sei, exceto googlar, eu realmente consigo achar QUALQUER coisa no Google. Amo aprender e estou em um processo contínuo de aperfeiçoamento e mudança de áreas. Tenho 10 anos de experiência com design gráfico e resolvi mudar de área para o meio digital: aprendi a programar, me apaixonei por Arduino, conheci o processing e nunca mais parei. Ah! antes que esqueça eu amo fotografia, gatinhos e não recuso uma pausa pro chá.',
    subject: 'Artes',
    cost: 30,
    weekday: [2, 4],
    time_from: [600, 600],
    time_to: [720, 720],
  },
];
const subjects = [
  'Artes',
  'Biologia',
  'Ciências',
  'Educação física',
  'Física',
  'Geografia',
  'História',
  'Matemática',
  'Português',
  'Química',
];
const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

// Funcionalidades
function getSubject() {
  const index = +subjectNumber - 1;
  return subjects[index];
}

function pageLanding(req, res) {
  return res.render('index.html');
}
function pageStudy(req, res) {
  const filters = req.query;
  return res.render('study.html', { proffys, filters, subjects, weekdays });
}
function pageGiveClasses(req, res) {
  const data = req.query;
  const isNotEmpty = Object.keys(data).length > 0;
  if (isNotEmpty) {
    data.subject = getSubject(data.subject);
    proffys.push(data);
    return res.redirect('/study');
  }

  return res.render('give-classes.html', { subjects, weekdays });
}

// Servidor
const express = require('express');
const server = express();

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
