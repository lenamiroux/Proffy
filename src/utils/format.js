// Dados
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
function getSubject(subjectNumber) {
  const index = +subjectNumber - 1;
  return subjects[index];
}

module.exports = {
  subjects,
  weekdays,
  getSubject,
};
