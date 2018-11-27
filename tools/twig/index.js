const twig = require('gulp-twig-pipe');
const dateFns = require('date-fns');
const path = require('path');
const locales = {
  en: require('date-fns/locale/en'),
  fr: require('date-fns/locale/fr'),
}

twig.extend(Twig => {
  Twig.exports.extendFilter('date', function (date, args) {
    const format = args[0];
    const lang = args[1];
    return dateFns.format(new Date(date), format, {locale: locales[lang]})
  });
  Twig.exports.extendFilter('isToday', function (date) {
    return dateFns.isToday(new Date(date))
  });
  Twig.exports.extendFilter('getRoot', function (context) {
    const dir = path.parse(context._target.relative).dir;
    let depth = (dir === '' ? [] : dir.split(path.sep)).length;

    const up = ['.'];
    while (depth--) { up.push('..'); }
    const result = up.join('/');

    return result.replace(/^\.\/\.\./, '..');
  });
})

module.exports = twig
