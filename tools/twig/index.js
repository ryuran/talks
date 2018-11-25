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

  Twig.exports.extendTag({
    type : 'root',
    regex: /^root$/,
    next : [ ],
    open : true,

    compile: function (token) {
      delete token.match;
      return token;
    },

    parse: function (token, context/*, chain*/) {
      const dir   = path.parse(context._target.relative).dir;
      let depth = (dir === '' ? [] : dir.split(path.sep)).length;

      return {
        chain : false,
        output: (function () {
          const up = ['.'];
          while (depth--) { up.push('..'); }
          return up.join('/');
        })()
      };
    }
  });
})

module.exports = twig
