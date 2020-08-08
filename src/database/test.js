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
    subject: '1',
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

  // Cria proffy
  // await createProffy(db, { proffyValue, classValue, classScheduleValues });

  // Consultar os dados inseridos
  //todos os proffys
  // const selectedProffys = await db.all('SELECT * FROM proffys');
  // //console.log(selectedProffys);

  // // consultar classes de um determinado professor
  // // trazer juntos os dados do professor
  const selectClassesAndProffys = await db.all(`
   SELECT classes.*, proffys.*
   FROM proffys
   JOIN classes ON (classes.proffy_id = proffys.id)
   WHERE classes.proffy_id = 1;
  `);
  // //console.log(selectClassesAndProffys);

  // // Horário SEG 10:00 - 12:00 QUA 10:00 - 12:00
  // // O Horário do time_from (10h) precisa ser menor ou igual ao horário solicitado
  // // O horário do time_to precisa ser maior
  const selectClassesSchedules = await db.all(`
    SELECT class_schedules.*
    FROM class_schedules
    WHERE class_schedules.class_id = "1"
    AND class_schedules.weekday = "2"
    AND class_schedules.time_from <= "600"
    AND class_schedules.time_to > "660"
  `);
  // console.log(selectClassesSchedules);
});
