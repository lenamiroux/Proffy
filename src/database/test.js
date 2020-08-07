const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
  // Inserir dados
  proffyValue = {
    name: 'Diego Fernandes',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
    whatsapp: '11999887766',
    bio:
      'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
  };

  classValue = {
    subject: 'Química',
    cost: '20',
    // O proffy virá do database
  };

  classScheduleValues = [
    {
      // class_id virá do database
      weekday: 2,
      time_from: 600,
      time_to: 720,
    },
    {
      // class_id virá do database
      weekday: 4,
      time_from: 600,
      time_to: 720,
    },
  ];

  await createProffy(db, { proffyValue, classValue, classScheduleValues });
  // Consultar os dados inseridos
});
