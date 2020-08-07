// Database
const Database = require('./database/db');

// Data Format
const { subjects, weekdays, getSubject } = require('./utils/format');

// Landing Page
function pageLanding(req, res) {
  return res.render('index.html');
}

// Study Page
function pageStudy(req, res) {
  const filters = req.query;

  if (!filters.subjects || !filters.weekday || !filters.time) {
    return res.render('study.html', { filters, subjects, weekdays });
  }
  console.log('Não tem campos vazios');
  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedules.*
      FROM class_schedules
      WHERE class_schedules.class_id = classes.id
      AND class_schedules.weekday = ${filters.weekday}
      AND class_schedules.time_from <= ${filters.time}
      AND class_schedules.time_to > ${filters.time}
    )
   `;

  return res.render('study.html', { proffys, filters, subjects, weekdays });
}

// Page Give-classes
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

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
};
