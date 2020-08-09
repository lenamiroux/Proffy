// Database
const Database = require('./database/db');

// Data Format
const {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes,
} = require('./utils/format');
const { render } = require('nunjucks');

// Landing Page
function pageLanding(req, res) {
  return res.render('index.html');
}

// Page Study
async function pageStudy(req, res) {
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render('study.html', { filters, subjects, weekdays });
  }
  console.log('Não tem campos vazios');

  const timeToMinutes = convertHoursToMinutes(filters.time);

  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedules.*
      FROM class_schedules
      WHERE class_schedules.class_id = classes.id
      AND class_schedules.weekday = ${filters.weekday}
      AND class_schedules.time_from <= ${timeToMinutes}
      AND class_schedules.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'
   `;

  //
  try {
    // tenta requisição no banco de dados
    const db = await Database;
    const proffys = await db.all(query);

    // alterando matéria de número para nome
    proffys.map((proffy) => {
      proffy.subject = getSubject(proffy.subject);
    });

    // retorna valores
    return res.render('study.html', { proffys, filters, subjects, weekdays });
  } catch (error) {
    // mensagem de erro
    console.error(error);
  }
}

// Page Give-classes
async function pageGiveClasses(req, res) {
  return res.render('give-classes.html', { subjects, weekdays });
}

// Page Save-classes
async function saveClasses(req, res) {
  const createProffy = require('./database/createProffy');
  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio,
  };
  const classValue = {
    subject: req.body.subject,
    cost: req.body.cost,
  };
  const classScheduleValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinutes(req.body.time_from[index]),
      time_to: convertHoursToMinutes(req.body.time_to[index]),
    };
  });

  try {
    const db = await Database;
    await createProffy(db, { proffyValue, classValue, classScheduleValues });

    let queryString = '?subject=' + req.body.subject;
    queryString += '&weekday=' + req.body.weekday[0];
    queryString += '&time=' + req.body.time_from[0];

    return res.redirect('/page-success' + queryString);
  } catch (error) {
    console.error(error);
  }
}

function pageSuccess(req, res) {
  const queryString = req.query;
  console.log(queryString);
  const subject = queryString.subject;
  const weekday = queryString.weekday;
  const [hours, minutes] = queryString.time.split(':');
  const time = hours + '%3A' + minutes;
  console.log(queryString);
  return res.render('page-success.html', { subject, weekday, time });
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  pageSuccess,
};
