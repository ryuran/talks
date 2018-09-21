'use strict'

const SOURCE = './contents'
const DIST = './dist'

const path = require('path')

const Metalsmith = require('metalsmith')
const defvalues = require('metalsmith-default-values')
const define = require('metalsmith-define')
const layouts = require('metalsmith-layouts')

const collections = require('metalsmith-collections')
const unlisted = require('metalsmith-unlisted')
const permalinks = require('metalsmith-permalinks')
const sitemap = require('metalsmith-sitemap')

const components = require('metalsmith-components')
const assets = require('metalsmith-assets')

const markdown = require('metalsmith-markdownit')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

const include = require('./plugins/include')
const sections = require('./plugins/sections')
const i18n = require('./plugins/i18n')

const abbr = require('markdown-it-abbr')
const decorate = require('markdown-it-decorate')
const deflist = require('markdown-it-deflist')
const embed = require('markdown-it-block-embed')
const implicitFigures = require('markdown-it-implicit-figures')
const mark = require('markdown-it-mark')
const prism = require('markdown-it-prism')
const strikethrough = require('markdown-it-strikethrough-alt')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')


markdown.parser.use(i18n)
markdown.parser.use(sections)
markdown.parser.use(include)
markdown.parser.use(abbr)
markdown.parser.use(decorate)
markdown.parser.use(deflist)
markdown.parser.use(embed)
markdown.parser.use(implicitFigures, {
  figcaption: true
})
markdown.parser.use(mark)
markdown.parser.use(prism)
markdown.parser.use(strikethrough)
markdown.parser.use(sub)
markdown.parser.use(sup)
markdown.env(page => ({
  lang: page.lang,
  path: page.path,
  basedir: path.resolve(SOURCE)
}))

const server = require('metalsmith-serve')
const watcher = require('metalsmith-watch')
const debug = require('metalsmith-debug')
const env = require('metalsmith-env')

const meta = require('./config/meta.json')
const defs = require('./config/defaults.json')

const metalsmith = new Metalsmith(__dirname)
  .metadata(meta)
  .source(SOURCE)
  .destination(DIST)
  .ignore([
    'sections',
    'whoami',
    'includes'
  ])
  .use(defvalues([{
    pattern: '**/*.md',
    defaults: defs
  }]))
  .use(define({
    dateFns: {
      locales: {
        en: require('date-fns/locale/en'),
        fr: require('date-fns/locale/fr')
      },
      isToday: require('date-fns/is_today'),
      format: require('date-fns/format')
    }
  }))

if (process.env.NODE_ENV === 'production') {
  metalsmith
    .clean(process.env.NODE_ENV === 'production')
}

if (process.env.NODE_ENV === 'development') {
  metalsmith
    .use(server({
      verbose: true
    }))
    .use(watcher({
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': "**/*",
      },
      livereload: true
    }))
    .use(env())
    .use(debug())
}

metalsmith
  .use(collections({
    current: {
      sortBy: 'pinned',
      refer: false
    }
  }))
  .use(unlisted())
  .use(markdown)
  .use(permalinks({
    pattern: ':title/:lang/',
    relative: false
  }))
  .use(layouts({
    engine: 'pug',
    default: 'default.pug'
    // pattern: '**/*.html'
  }))
  .use(components({
    'componentDirectory': 'node_modules',
    'components': {
      'reveal.js': {
        'css/**/*.css': 'assets/css/',
        'js/*.js': 'assets/js',
        'lib/js/*.js': 'assets/js',
        'plugin/zoom-js': 'assets/js/plugin',
        'plugin/notes': 'assets/js/plugin'
      }
    }
  }))
  .use(assets())

if (process.env.NODE_ENV === 'production') {
  metalsmith
    .use(sitemap({
      hostname: meta.siteurl,
      omitIndex: true
    }))
}

metalsmith
  .build(function (err) { if (err) throw err })
