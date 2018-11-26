const twig = require('gulp-twig-pipe');
const dateFns = require('date-fns');
var path = require('path');

twig.extend(Twig => {
  Twig.exports.extendFilter('date', function (date, format, lang) {
    return dateFns(new Date(date), format, {locale: dateFns.locales[lang]})
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
