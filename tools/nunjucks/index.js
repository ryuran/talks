const njk = require('nunjucks')
const dateFns = require('date-fns')

const njkEnv = new njk.Environment([new njk.FileSystemLoader('./src/templates')])

njkEnv.addFilter('date', function (date, format, lang) {
  return dateFns(new Date(date), format, {locale: dateFns.locales[lang]})
});
njkEnv.addFilter('isToday', function (date) {
  return dateFns.isToday(new Date(date))
});

module.exports = njkEnv
