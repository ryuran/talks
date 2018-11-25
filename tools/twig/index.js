const twig = require('gulp-twig-pipe');
const dateFns = require('date-fns')

twig.extend(Twig => {
  Twig.exports.extendFilter('date', function (date, format, lang) {
    return dateFns(new Date(date), format, {locale: dateFns.locales[lang]})
  });
  Twig.exports.extendFilter('isToday', function (date) {
    return dateFns.isToday(new Date(date))
  });
})

module.exports = twig
